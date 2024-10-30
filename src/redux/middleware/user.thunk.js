import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllUserByToken, getUserData , getUserDataByToken, updateUserByToken } from '../../logics/user.logics';


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


