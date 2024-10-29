import { createSlice } from "@reduxjs/toolkit";
import { getAllUser, getUser, getUserByToken, updateUser } from "../middleware/user.thunk";
// import { toast } from "react-toastify";




const userSlice = createSlice({
  name: "user",
  initialState:{
    user: {},
    userList:[],
    isLoading: false ,
    error : null,
    url:"http://localhost:8080/api/user",
  },
  reducers: {
    // get data on page reload
    getUserData:(state, action) => {
        state.user = action.payload;
        // console.log("from slice",action)
        state.isLoading = false;
    },
  },
  extraReducers:(builder) => {
    builder
    .addCase(getUser.pending , (state) => {
      state.isLoading = true;
    })
    .addCase(getUser.fulfilled , (state,action) => {
      state.user = action.payload;
      state.isLoading = false;
    })
    .addCase(getUser.rejected , (state) => {
      state.isLoading = false;
    })
    .addCase(getUserByToken.fulfilled , (state,action) => { // get user data while login
      state.user = action.payload;
    })
    .addCase(updateUser.fulfilled , (state,action) => { // update user data
      state.user = action.payload;
    })
    .addCase(getAllUser.fulfilled , (state,action) => {
      state.userList = action.payload;
    })

  }

});

// exporting actions
export const { getUserData } = userSlice.actions;
// exporting reducer
export default userSlice.reducer;