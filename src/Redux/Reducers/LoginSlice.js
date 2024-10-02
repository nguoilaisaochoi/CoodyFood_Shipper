import { createSlice } from "@reduxjs/toolkit";
import { login, loginWithSocial } from "../API/UserAPI";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager } from "react-native-fbsdk-next";

const initialState = {
    user: null,
    status: false,
    error: ''
}

const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null
            GoogleSignin.signOut()
            LoginManager.logOut()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.status = 'loading'
            console.log('Loading');
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.status = 'success'
            state.user = action.payload
            console.log('Success');
        })
        builder.addCase(login.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
            console.log('Error');
        })

        builder.addCase(loginWithSocial.pending, (state, action) => {
            state.status = 'loading'
            console.log('Loading');
        })
        builder.addCase(loginWithSocial.fulfilled, (state, action) => {
            state.status = 'success'
            state.user = action.payload
            console.log('Success');
        })
        builder.addCase(loginWithSocial.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
            console.log('Error');
        })

    }
})

export const { logout } = LoginSlice.actions
export default LoginSlice.reducer