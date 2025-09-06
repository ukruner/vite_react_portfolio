import { createSlice } from "@reduxjs/toolkit";


const initialState = {user: ''};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload;
        },
        clearUser(state){
            state.user = '';
                } 
    }

})

export const userActions = userSlice.actions;

export default userSlice.reducer;