
import { createSlice } from "@reduxjs/toolkit";
import { addMovie, getMovies, getMoviesCreatedByMe } from "../middleware/movie.thunk";




const movieSlice = createSlice({
  name: "movie",
  initialState:{
    movies: [],
    myMovies:[],
    isLoading: false ,
    error : null,
    myUrl:"http://localhost:8080/api/movie",
    imdbUrl : "https://imdb188.p.rapidapi.com/api/v1"
  },
  extraReducers:(builder) => {
    builder
    .addCase(getMovies.pending , (state) => { 
      state.isLoading = true;
    })
    .addCase(getMovies.fulfilled , (state,action) => { // get movies from third party api
      state.movies = action.payload;
      state.isLoading = false;
    })
    .addCase(getMovies.rejected , (state) => {
      state.isLoading = false;
    })
    .addCase(addMovie.fulfilled , (state,action) =>{ // new movie added
      state.movies = action.payload;
    })
    .addCase(getMoviesCreatedByMe.fulfilled , (state,action) => { // // get movies which are created by me
      state.myMovies = action.payload;
    })
  }

});

// exporting actions
// export const { getUserData } = movieSlice.actions;

// exporting reducer
export default movieSlice.reducer;
