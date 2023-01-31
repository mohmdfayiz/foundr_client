import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modalDisplay/modalSlice"
import authReducer from "../features/authentication/authSlice"

export default configureStore({
    reducer:{
        modal: modalReducer,
        auth: authReducer,
    }
})