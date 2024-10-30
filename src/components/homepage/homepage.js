import React, { useEffect , useState } from 'react'
import { getUserByToken } from '../../redux/middleware/user.thunk'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../navbar/navbar';
import Card from '../card/card';
import { addMovie, getMoviesCreatedByMe, sampleMovies } from '../../redux/middleware/movie.thunk';
import Carousel from '../carousel/carousel';

const Homepage = () => {

    const dispatch = useDispatch();
    const {url} = useSelector(state => state.userReducer);
    const {isLoading,movies,myUrl,myMovies} = useSelector(state => state.movieReducer);
    const token = sessionStorage.getItem("user");
    console.log("movies",myMovies)

    useEffect(() => {
        if(token){
          let data = {token,url}
          dispatch(getUserByToken(data))
          dispatch(getMoviesCreatedByMe({token,url:myUrl}))
        }
        dispatch(sampleMovies())
    },[token])

  return (
    <div id="homepage">
        <Navbar />
        { movies.length ? <>
          <Carousel movies={movies} />
          <div id="display-results">
  
              {
                  isLoading && token ? <p>loading...</p> : <>
  
                  {
                    [...myMovies,...movies].map((movie,index) => <div key={movie.name+index.toString()}> <Card movie={movie}/> </div> )
                    // myMovies.map((movie,index) => <div key={movie.name+index.toString()}> <Card movie={movie}/> </div> )
                  }
                  
                  </>
              }
  
          </div>
          </> : "loading..."
        }
        
    </div>
  )
}

export default Homepage