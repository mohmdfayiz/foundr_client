import { createSlice } from "@reduxjs/toolkit";
export const matchingProfileSlice = createSlice({
    name:'matchingProfileModal',
    initialState:{
        show: false,
        profile:{}
    },
    reducers:{
        showModal:(state) =>{
            state.show = !state.show;
        },
        setProfile:(state, data) => {
            state.profile = data.payload
        }
    }
})

export const {showModal, setProfile} = matchingProfileSlice.actions;
export default matchingProfileSlice.reducer;