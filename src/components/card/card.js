import React from 'react'
import { shrinkTheString } from '../../logics/movies.logics'

const Card = ({movie}) => {
  return (
    <div>

        <div className="card" style={{width: "18rem"}}>
            <div className='poster-container'>
            <img src={movie.image} className="card-img-top" alt={shrinkTheString(movie.title)} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <p className="card-text">year of release : {movie.year} </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">producer : {movie.producer ? movie.producer : "NO DATA" } </li>
              <li className="list-group-item cast-crew-namelist"> cast crew :
                {
                    movie.stars.split(",").map((actor) => <span key={actor} style={{margin:"2px",wordBreak:"break-word"}}> {actor} </span> )
                }
              </li>
            </ul>
        </div>

    </div>
  )
}

export default Card