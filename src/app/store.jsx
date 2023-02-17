import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modalDisplay/modalSlice"
import authReducer from "../features/authentication/authSlice"
import connectionsReducer from '../features/modalDisplay/connectionSlice'
import profileReducer from '../features/modalDisplay/matchingProfileSlice'

export default configureStore({
    reducer:{
        modal: modalReducer,
        auth: authReducer,
        connectionsModal: connectionsReducer,
        profileModal: profileReducer,
    }
})