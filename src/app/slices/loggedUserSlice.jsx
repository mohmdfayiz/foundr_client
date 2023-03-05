import { createSlice } from "@reduxjs/toolkit";
export const loggedUserSlice = createSlice({
    name:'loggedUser',
    initialState:{
        userId:'',
        connectionRequests:[]
    },
    reducers:{
        setUser:(state,data) => {
            state.userId = data.payload
        },
        setConnectionRequests:(state,data)=>{
            state.connectionRequests = data.payload
        }
    }
})

export const {setUser, setConnectionRequests} = loggedUserSlice.actions;
export default loggedUserSlice.reducer;