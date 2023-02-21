import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modalDisplay/eventSlice"
import authReducer from "../features/authentication/authSlice"
import connectionsReducer from '../features/modalDisplay/connectionSlice'
import profileReducer from '../features/modalDisplay/matchingProfileSlice'
import notificationSlice from "../features/notification/notificationSlice";

export default configureStore({
    reducer:{
        auth: authReducer,
        eventModal: modalReducer,
        connectionsModal: connectionsReducer,
        profileModal: profileReducer,
        notification: notificationSlice,
    }
})