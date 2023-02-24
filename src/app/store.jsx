import { configureStore } from "@reduxjs/toolkit";
import loggedUserReducer from "../features/loggedUser/loggedUserSlice";
import authReducer from "../features/authentication/authSlice"
import modalReducer from "../features/modalDisplay/eventSlice"
import connectionsReducer from '../features/modalDisplay/connectionSlice'
import profileReducer from '../features/modalDisplay/matchingProfileSlice'
import notificationSlice from "../features/notification/notificationSlice";

export default configureStore({
    reducer:{
        auth: authReducer,
        loggedUser:loggedUserReducer,
        eventModal: modalReducer,
        connectionsModal: connectionsReducer,
        profileModal: profileReducer,
        notification: notificationSlice,
    }
})