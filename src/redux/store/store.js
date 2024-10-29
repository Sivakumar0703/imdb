
import {  configureStore } from "@reduxjs/toolkit" ;
import userSlice from "../slice/user.slice" ;  // reducer from userSlice 
import movieSlice from "../slice/movie.slice" ;  

export const store = configureStore({
	reducer : {
		userReducer : userSlice,
		movieReducer : movieSlice
	}
})
