import React, { useEffect , useState } from 'react'
import { getUserByToken } from '../../redux/middleware/user.thunk'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../navbar/navbar';
import Card from '../card/card';
import { getMoviesCreatedByMe } from '../../redux/middleware/movie.thunk';
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
    },[token])

  return (
    <div id="homepage">
        <Navbar />
        <Carousel movies={myMovies} />
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
        
    </div>
  )
}

export default Homepage