import {useEffect,useState}  from 'react'
import Navbar from '../navbar/navbar'
import { useDispatch, useSelector } from 'react-redux';
import { getUserByToken, updateUser } from "../../redux/middleware/user.thunk";
import { toast } from 'react-toastify';

const Profile = () => {

    const today = new Date().toISOString().split("T")[0];
    const {user,isLoading,url} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const token = sessionStorage.getItem("user");
    const [disabled , setdisabled] = useState(true);
    const [form , setForm] = useState({
        gender:"",
        dob:"",
        category:"",
        bio: ""
    })


    // load user data on page refresh
    useEffect(() => {
        let data = {token,url}
        dispatch(getUserByToken(data))
    },[])

    useEffect(() => {
        setForm({
            gender:user?.gender,
            dob:user?.dob,
            category:user?.category,
            bio:user?.bio 
        })
    },[user])

   

    function handleChange(e){
        console.log(e.target.name)
        setForm(prev => ({ ...prev , [e.target.name]:e.target.value }))
    }

    function editProfile(){
        if(disabled){
            setdisabled(false)
        } else {
            setdisabled(true)
        }  
    }

    function saveEditedProfile(e){
        e.preventDefault();
        if(!form.dob){
            return toast.warn("Please Enter Your Date Of Birth")
        }
        if(form.bio.length < 200){
            return toast.warn("Bio Should Atleast Contain 200 Characters")
        }
        form.token = token;
        form.url = url;
        dispatch(updateUser(form));
        setdisabled(true)
    }



  return (
    <div id="profile-page"> 
        {
            isLoading ? <p>Loading .... </p> : <>

            <div>
              <Navbar />
            </div>

            <div id="profile-container">

                <div id="user-basic-detail-container">
                    <div id="profile-image-container" >
                      <img src={user?.image} style={{borderRadius:"50%"}}   alt="profile=picture" />
                    </div>

                    <div>
                        <p> NAME : {user?.name} </p>
                        <p> EMAIL : {user?.email} </p>
                    </div>
                </div>

               <hr/>

             <div>
                <form onSubmit={saveEditedProfile}>
                <div>
                 <p style={{marginBottom:"0px"}}>GENDER</p> 
                 <label>  <input type="radio" name="gender" value="male" required disabled={disabled} checked={form.gender === "male"} onChange={handleChange}  /> Male   </label> &nbsp;
                 <label>  <input type="radio" name="gender" value="female" required disabled={disabled} checked={form.gender === "female"} onChange={ handleChange} /> Female   </label> &nbsp; 
                 <label>  <input type="radio" name="gender" value="others" required disabled={disabled} checked={form.gender === "others"} onChange={ handleChange} /> Others   </label> 
                </div> <br/>

                <div>
                 <label htmlFor="dob" className="label">DATE OF BIRTH</label> <br/>
                 <input type="date" name="dob" id="dob" value={form.dob} max={today} disabled={disabled} onChange={ handleChange} />
                </div> <br/>

                <div>
                 <p style={{marginBottom:"0px"}}>CATEGORY</p> 
                 <label htmlFor="category-user">  <input type="radio" id="category-user" name="category" value="user" required disabled={disabled} onChange={ handleChange} checked={form.category == "user"} /> USER   </label> &nbsp;
                 <label htmlFor="category-actor">  <input type="radio" id="category-actor" name="category" value="actor" required disabled={disabled} onChange={ handleChange} checked={form.category == "actor"} /> ACTOR   </label> &nbsp; 
                 <label htmlFor="category-producer">  <input type="radio" id="category-producer" name="category" value="producer" required disabled={disabled} onChange={ handleChange} checked={form.category == "producer"} /> PRODUCER   </label> 
                </div>  <br/>

                <div>
                 <label htmlFor="bio" className="label">BIO</label> <br/>
                 <textarea name="bio" id="bio" minLength="200" rows="6" defaultValue={form.bio} placeholder="Write about you here..." style={{padding:"5px"}}  disabled={disabled} onChange={ handleChange}></textarea>  
                </div>  <br/> 

                <div className='edit-btn'>
                    <button className='btn btn-primary' type="button" style={{marginBottom:"5px"}} onClick={editProfile}>{disabled ? "EDIT" : "CANCEL"}</button> &nbsp;
                    <button className='btn btn-success' type='submit' style={{marginBottom:"5px"}} disabled={disabled}>SAVE</button>
                </div>
                </form>
             </div>
            </div>
            
            </>
        }
    </div>
  )
}

export default Profile