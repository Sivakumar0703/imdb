
import { createSlice } from "@reduxjs/toolkit";
import { addMovie, getMovies, getMoviesCreatedByMe, sampleMovies } from "../middleware/movie.thunk";




const movieSlice = createSlice({
  name: "movie",
  initialState:{
    movies: [],
    myMovies:[],
    isLoading: false ,
    error : null,
    selectedCard:{},
    myUrl:"https://imdb-backend-nssv.onrender.com/api/movie",
    imdbUrl : "https://imdb188.p.rapidapi.com/api/v1"
  },
  reducers: {
    // get details of selected card
    getSelectedCard:(state, action) => {
      state.selectedCard = action.payload;
    },
    // show movies based on search
    searchResultForMyMovies:(state,action) =>{
      state.myMovies = action.payload
    }
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
    .addCase(getMoviesCreatedByMe.pending , (state) => { 
      state.isLoading = true;
    })
    .addCase(getMoviesCreatedByMe.fulfilled , (state,action) => { // get movies which are created by me
      state.myMovies = action.payload;
      state.isLoading = false;
    })
    .addCase(sampleMovies.fulfilled , (state,action) => { // sample movies data
      state.movies = action.payload;
    })
  }

});

// exporting actions
export const { getSelectedCard , searchResultForMyMovies} = movieSlice.actions;

// exporting reducer
export default movieSlice.reducer;
