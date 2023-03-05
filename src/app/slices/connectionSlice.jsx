import { createSlice } from "@reduxjs/toolkit";
export const connectionSlice = createSlice({
    name:'connectionsModal',
    initialState:{
        show: false,
        connections:[]
    },
    reducers:{
        showConnections: (state) => {
            state.show = !state.show;
        },
        setConnection:(state, data) => {
            state.connections = data.payload;
        }
    }
})

export const {showConnections, setConnection} = connectionSlice.actions;
export default connectionSlice.reducer;