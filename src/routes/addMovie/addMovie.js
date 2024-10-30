import {useEffect, useRef, useState} from 'react'
import Navbar from '../../components/navbar/navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../redux/middleware/user.thunk';
import AutoCompleteSearch from '../../components/autoCompleteSearch/autoCompleteSearch';
import Modal from '../../components/modal/modal';
import { toast } from 'react-toastify';
import { movieLogicHandleImage } from '../../logics/movies.logics';
import { addMovie } from '../../redux/middleware/movie.thunk';
import { useNavigate } from 'react-router-dom';


const AddMovie = () => {
    const [formData , setFormData] = useState({
        title:"",
        year:"",
        genre:"",
        stars:[],
        image:"",
        producer:[]
    });
    const dispatch = useDispatch();
    const token = sessionStorage.getItem("user");
    const {url} = useSelector(state => state.userReducer);
    const [selectedUsers , setSelectedUsers] = useState([]);
    const [selectedProducer , setSelectedProducer] = useState([]);
    const [imageLoading , setImageLoading] = useState(false);
    const {myUrl} = useSelector(state => state.movieReducer);
    const inputRef = useRef(null);
    const navigate = useNavigate();



    function handleChange(e){
      e.preventDefault();
      if(e.target.name == "year"){
        const currentYear = new Date().getFullYear();
        if(! (e.target.value <= currentYear) ){
          return toast.warn(`${currentYear} is the max limit`.toUpperCase());
        }
      }
      setFormData(prev => ({...prev , [e.target.name]:e.target.value}))
    }

    async function handleImage(e){
      let data = {setImageLoading,setFormData,imageFile:e.target.files[0]
      }
      movieLogicHandleImage(data)
    }

    function addNewMovie(){
      let data = {formData,url:myUrl,token,setFormData,
        setSelectedUsers,
        setSelectedProducer,
        userUrl:url,
        ref:inputRef,
        navigate:navigate
      }
      dispatch(addMovie(data))
    }

    useEffect(() => {
      if(token){
        let data = {token,url}
        dispatch(getAllUser(data))
      }
    },[])

   return (
    <div id="add-new-movie-page">
        <div>
          <Navbar />
        </div>

        <h2 style={{textAlign:"center"}}>ADD NEW MOVIE</h2>

        <div id="add-movie-form">
        <div id="movie-form-container">
        <div className="input-container">
          <label htmlFor="title" className="label">MOVIE TITLE</label> <br/>
          <input className="new-movie-input-field" name="title" id="title" type="text" placeholder="Movie Name" value={formData.title} onChange={handleChange}  required />
        </div>

        <hr/>

        <div className="input-container">
          <label htmlFor="year" className="label">MOVIE RELEASE YEAR</label> <br/>
          <input className="new-movie-input-field" name="year" id="year" type="text" placeholder="YEAR OF RELEASE" value={formData.year} onChange={handleChange}  required />
        </div>

        <hr/>

        <div className="input-container">
          <label htmlFor="genre" className="label">GENRE</label> <br/>
          <input className="new-movie-input-field" name="genre" id="genre" type="text" placeholder="MOVIE GENRE" value={formData.genre} onChange={handleChange}  required />
        </div>

        <hr/>

        <div className="input-container">
          <label  className="label">CAST CREW - &nbsp; <span>{selectedUsers.length}</span></label>
          <button className="btn btn-info" type='button' data-bs-toggle="modal" data-bs-target="#addPersonModal" style={{margin:"5px 10px"}}>ADD</button>
          <br/>
          <AutoCompleteSearch  selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} isProducer={false} setFormData={setFormData} />
          {/* listing selected cast crew members */}
         <div style={{marginTop:"2px"}}>
            {
              selectedUsers.length ? selectedUsers.map((user) => (
                <span key={user.email} className="badge rounded-pill text-bg-primary" style={{margin:"2px"}}>{user.name}</span>
              )) :  ""
            }
          </div>
        </div>

        <hr/>

        <div className="input-container">
          <label htmlFor="poster" className="label">MOVIE POSTER</label> &nbsp; {imageLoading ? <span>Uploading...</span> : ""} <br/>
          <input type='file' accept='image/png,image/jpg,image/jpeg' name="image" id="poster" onChange={handleImage}  required ref={inputRef} />
        </div>

        <hr/>

        <div className="input-container">
          <label htmlFor="producer" className="label">PRODUCER - &nbsp; <span>{selectedProducer.length}</span></label> 
          <button className="btn btn-info" type='button' data-bs-toggle="modal" data-bs-target="#addPersonModal" style={{margin:"5px 10px"}}> ADD </button>

           <br/>
          <AutoCompleteSearch  selectedUsers={selectedProducer} setSelectedUsers={setSelectedProducer} isProducer={true} setFormData={setFormData} />
          {/* listing producer */}
        <div style={{marginTop:"2px"}}>
            {
              selectedProducer.length ? 
                <span className="badge rounded-pill text-bg-primary" style={{margin:"2px"}}>{selectedProducer[0].name}</span>
               :  ""
            }
        </div>
        </div>

        <hr/>

        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
          <button className='btn btn-success'  onClick={addNewMovie}>Add MOVIES</button>
        </div>

        <div>
          <Modal />
        </div>
        </div>

        </div>
    </div>
  )
}

export default AddMovie