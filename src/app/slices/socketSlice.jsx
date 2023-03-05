import { createSlice } from "@reduxjs/toolkit";
export const socketSlice = createSlice({
    name:"webSocket",
    initialState:{
        socket:'',
    },
    reducers:{
        setSocket:(state,data)=>{
            state.socket = data.payload
        }
    }
})

export const {setSocket} = socketSlice.actions;
export default socketSlice.reducer;