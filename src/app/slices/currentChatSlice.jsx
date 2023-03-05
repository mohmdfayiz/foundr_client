import { createSlice } from "@reduxjs/toolkit";
export const currentChatSlice = createSlice({
    name:'currentChat',
    initialState:{
        chatUser:{}
    },
    reducers:{
        setChatUser: (state,data)=>{
            state.chatUser = data.payload
        }
    }
})

export const {setChatUser} = currentChatSlice.actions;
export default currentChatSlice.reducer;