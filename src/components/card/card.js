import { shrinkTheString } from '../../logics/movies.logics'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getSelectedCard } from '../../redux/slice/movie.slice'

const Card = ({movie}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function handleClick(){
    dispatch(getSelectedCard(movie))
    if(movie._id){
      return navigate(`/view_details/${movie._id}`)
    }
    return navigate(`/view_details/${movie.id}`)
  }

  return (
    <div>

        <div className="card" style={{width: "18rem",cursor:"pointer"}} onClick={handleClick}>
            <div className='poster-container'>
            <img src={movie.image} className="card-img-top" alt={shrinkTheString(movie.title)} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">year of release : {movie?.year?.length > 5 ? movie.year.substring(11,16) : "N/A"} </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">producer : {movie.producer ? movie.producer.name : "NO DATA" } </li>
              <li className="list-group-item cast-crew-namelist"> cast crew :
                {
                  typeof(movie.stars) == "object" ?
                  movie.stars.map((actor) => <span key={actor.email} style={{margin:"2px",wordBreak:"break-word"}}> {actor.name} </span> ) :
                  movie.stars.split(",").map((actor) => <span key={actor} style={{margin:"2px",wordBreak:"break-word"}}> {actor} </span> )
                }
              </li>
            </ul>
        </div>

    </div>
  )
}

export default Card