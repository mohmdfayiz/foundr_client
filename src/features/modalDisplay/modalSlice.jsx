import { createSlice } from "@reduxjs/toolkit";
export const modalSlice = createSlice({

    name:"modal",
    initialState:{
        visible: false,
    },
    reducers:{
        modalVisiblity : (state)=>{
            state.visible = !state.visible
        }
    }
})

export const { modalVisiblity } = modalSlice.actions;
export default modalSlice.reducer;