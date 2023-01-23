import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modalDisplay/modalSlice"

export default configureStore({
    reducer:{
        modal: modalReducer,
    }
})