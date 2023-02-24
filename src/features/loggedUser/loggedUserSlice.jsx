import { createSlice } from "@reduxjs/toolkit";
export const loggedUserSlice = createSlice({
    name:'loggedUser',
    initialState:{
        user:{
            id:null,
            profilePhoto:null,
            connections:[]
        },
        connectionRequests:[]
    },
    reducers:{
        setUser:(state,data) => {
            state.user = data.payload
        },
        setConnectionRequests:(state,data)=>{
            state.connectionRequests = data.payload
        }
    }
})

export const {setUser, setConnectionRequests} = loggedUserSlice.actions;
export default loggedUserSlice.reducer;