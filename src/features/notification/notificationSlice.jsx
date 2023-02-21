import { createSlice } from "@reduxjs/toolkit";
export const notificationSlice = createSlice({
    name:'notification',
    initialState:{
        notifications: []
    },
    reducers:{
        setNotification:(state,data) => {
            state.notifications = [data.payload, ...notifications]
        }
    }
})

export const {setNotification} = notificationSlice.actions;
export default notificationSlice.reducer;