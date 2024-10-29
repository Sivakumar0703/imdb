import React, { useEffect } from 'react'
import { getUserByToken } from '../../redux/middleware/user.thunk'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../navbar/navbar';
import Card from '../card/card';
import { getMoviesCreatedByMe } from '../../redux/middleware/movie.thunk';

const Homepage = () => {

    const dispatch = useDispatch();
    const {url} = useSelector(state => state.userReducer);
    const {isLoading,movies,myUrl} = useSelector(state => state.movieReducer);
    const token = sessionStorage.getItem("user");
    console.log("movies",movies)

    useEffect(() => {
        if(token){
          let data = {token,url}
          dispatch(getUserByToken(data))
          dispatch(getMoviesCreatedByMe({token,url:myUrl}))
        }
    },[])

  return (
    <div id="homepage">
        <Navbar />
        <div id="display-results">

            {
                isLoading ? <p>loading...</p> : <>

                {
                    movies.map((movie,index) => <div key={movie.name+index.toString()}> <Card movie={movie}/> </div> )
                }
                
                </>
            }

        </div>
        
    </div>
  )
}

export default Homepage