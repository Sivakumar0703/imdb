import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMoviesData, getSampleMoviesData, movieLogicAddNewMovie, movieLogicGetMoviesCreatedByMe } from "../../logics/movies.logics";

// movies on search
export const getMovies = createAsyncThunk("movie/getMovies" , 
    async function (data , thunkApi){
        try {
            return await getMoviesData(data);
        } catch (error) {
            return console.log(thunkApi.rejectWithValue(error.message));
        }
    }
);

// sample movie data
export const sampleMovies = createAsyncThunk("movie/sampleMovies" , 
    async function (data,thunkApi) {
        try {
            return await getSampleMoviesData() 
        } catch (error) {
            return console.log(thunkApi.rejectWithValue(error.message));
        }  
    }
)


// add new movie
export const addMovie = createAsyncThunk("movie/addMovie" , 
    async function (data , thunkApi){
        try {
            const result = await movieLogicAddNewMovie(data);
            return result
        } catch (error) {
            return console.log(thunkApi.rejectWithValue(error.message));
        }
    }
);

// get all movies created by me
export const getMoviesCreatedByMe = createAsyncThunk("movie/getMoviesCreatedByMe" , 
    async function (data){
        try {
            return await movieLogicGetMoviesCreatedByMe(data);
        } catch (error) {
            return console.log(error.message);
        }
    }
);