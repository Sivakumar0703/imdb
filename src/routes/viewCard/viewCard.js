import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getMoviesCreatedByMe } from '../../redux/middleware/movie.thunk';
import Navbar from '../../components/navbar/navbar';

const ViewCard = () => {

    const {selectedCard,myMovies,myUrl,isLoading} = useSelector(state => state.movieReducer);
    const [cardDetail , setCardDetail] = useState(selectedCard);
    const dispatch = useDispatch();
    const token = sessionStorage.getItem("user");
    console.log(selectedCard);
    const{id} = useParams();

    useEffect(()=>{
        dispatch(getMoviesCreatedByMe({token,url:myUrl}))
    },[])

    useEffect(() => {
        console.log("render",id,myMovies)
        retriveSelectedCardDetail()
    },[isLoading])

    function retriveSelectedCardDetail(){
        const selected = myMovies.filter((movie) => movie._id == id);
        setCardDetail(selected[0])
    }

  return (
    <div>
        <Navbar />

    <div id="view-details-container">
       

        {
            cardDetail?.title ? <>

        <div style={{marginTop:"15px"}}>
            <div className="detail-image-container">
                <img src={cardDetail.image} alt={cardDetail.title} />
            </div>

            <div className="detail-image-container">

                <div className='table-data'>
                    <div>MOVIE</div>
                    <div> {cardDetail.title}</div>
                </div>

                <div className='table-data' >
                    <div>YEAR</div>
                    <div> {cardDetail.year ? cardDetail.year.length > 5 ? cardDetail.year.substring(11,16) :  cardDetail.year
                     : "N/A"}</div>
                </div>

                <div className='table-data' >
                    <div>PRODUCER</div>
                    <div> {cardDetail.producer?.name}</div>
                </div>

                <div className='table-data' >
                    <div>STARS</div>
                    <div> 
                        {
                        typeof(cardDetail.stars) == "object" ?
                        cardDetail.stars.map(actor => {
                                return <span key={actor.name}>{actor.name} </span>
                            })
                            :
                            cardDetail.stars.split(",").map((actor) => <span key={actor} style={{margin:"2px",wordBreak:"break-word"}}> {actor} </span> )
                        }
                    </div>
                </div>

            </div>
        </div>

        <hr/>


            </> : "Loading..."
        }
    

    </div>
    </div>
  )
}

export default ViewCard