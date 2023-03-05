import { configureStore } from "@reduxjs/toolkit";
import loggedUserReducer from './slices/loggedUserSlice'
import authReducer from "./slices/authSlice";
import modalReducer from "./slices/eventSlice";
import connectionsReducer from "./slices/connectionSlice";
import profileReducer from "./slices/matchingProfileSlice";
import notificationSlice from "./slices/notificationSlice";
import currentChatSlice from "./slices/currentChatSlice";
import socketSlice from "./slices/socketSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    loggedUser: loggedUserReducer,
    eventModal: modalReducer,
    connectionsModal: connectionsReducer,
    profileModal: profileReducer,
    notification: notificationSlice,
    currentChat: currentChatSlice,
    webSocket: socketSlice,
  },
});
