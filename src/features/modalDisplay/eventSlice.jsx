import { createSlice } from "@reduxjs/toolkit";
export const modalSlice = createSlice({

    name:"eventModal",
    initialState:{
        visible: false,
        event:{},
    },
    reducers:{
        modalVisiblity : (state)=>{
            state.visible = !state.visible
        },
        setEvent:(state,data) => {
            state.event = data.payload;
        }
    }
})

export const { modalVisiblity, setEvent } = modalSlice.actions;
export default modalSlice.reducer;