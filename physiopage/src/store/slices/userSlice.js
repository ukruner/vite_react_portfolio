import { createSlice } from "@reduxjs/toolkit";


const initialState = { user: '', authResolved: false };

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload;
            state.authResolved = true;
        },
        clearUser(state){
            state.user = '';
            state.authResolved = true;
        },
        setAuthResolved(state, action) {
            state.authResolved = action.payload;
        },
    }

})

export const userActions = userSlice.actions;

export default userSlice.reducer;
