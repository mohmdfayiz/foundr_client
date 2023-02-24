import { configureStore } from "@reduxjs/toolkit";
import loggedUserReducer from "../features/loggedUser/loggedUserSlice";
import authReducer from "../features/authentication/authSlice"
import modalReducer from "../features/modalDisplay/eventSlice"
import connectionsReducer from '../features/modalDisplay/connectionSlice'
import profileReducer from '../features/modalDisplay/matchingProfileSlice'
import notificationSlice from "../features/notification/notificationSlice";
import currentChatSlice from "../features/currentChat/currentChatSlice";

export default configureStore({
    reducer:{
        auth: authReducer,
        loggedUser:loggedUserReducer,
        eventModal: modalReducer,
        connectionsModal: connectionsReducer,
        profileModal: profileReducer,
        notification: notificationSlice,
        currentChat: currentChatSlice,
    }
})