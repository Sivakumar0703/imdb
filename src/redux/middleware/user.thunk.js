import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUserByToken, getUserData , getUserDataByToken, updateUserByToken } from '../../logics/user.logics';



// export const saveNewPost = createAsyncThunk("user/fetchUserData",
//     async function getUserData(data){
//         try {
//             const sendPost = await axios.post(`${data.url}/user/login` , {content:data.content} , {
//                 headers : {
//                     Authorization : `Bearer ${data.token}`
//                 }
//             })
//             return sendPost.data.user
//         } catch (error) {
//             console.log(error)
//             toast.error("error in saving post".toUpperCase())
//         }
//     }
// );


export const getUser = createAsyncThunk("user/fetchUserData" , 
    async function (data , thunkApi){
        try {
            return await getUserData(data);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const getUserByToken = createAsyncThunk("user/getUserByToken" , 
    async function (token , thunkApi){
        try {
            return await getUserDataByToken(token);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

// updating profile data
export const updateUser = createAsyncThunk("user/updateUser" , 
    async function (token , thunkApi){
        try {
            return await updateUserByToken(token);
        } catch (error) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const getAllUser = createAsyncThunk("user/getAllUser" , 
    async function (data , thunkApi){
        try {
            return await getAllUserByToken(data);
        } catch (error) {
            console.log(thunkApi.rejectWithValue(error.message)) ;
        }
    }
);

// update user movie list
// export const addRecentlyActedMovie = createAsyncThunk("user/addRecentlyActedMovie" , 
//     async function (data,thunkApi){
//         try {
//             return await userLogicAddRecentlyActedMovie(data);
//         } catch (error) {
//             console.log(thunkApi.rejectWithValue(error.message)) ;
//         }
//     }
// )
