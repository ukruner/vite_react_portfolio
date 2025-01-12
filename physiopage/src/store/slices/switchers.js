import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

const initialState = {isAuth: false, isSidebarOpen: false, isMarqueeActive: false}
const switcherSlice = createSlice({
name: "switchers",
initialState,
reducers:
{ setIsAuth(state){
    state.isAuth = !state.isAuth;
},
setIsSidebarOpen(state){
    if (!state.isSidebarOpen){
        state.isSidebarOpen = true;
    }
    else {
        state.isSidebarOpen = false;
    }
    
    },
    
setMarqueeActive(state){
    state.isMarqueeActive = !state.isMarqueeActive;

}
}
})

export const switcherActions = switcherSlice.actions;

export default switcherSlice.reducer;