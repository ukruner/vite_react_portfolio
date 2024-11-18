import { createSlice } from "@reduxjs/toolkit";




const initialState = {isAuth: false, isSidebarOpen: false}
const SwitcherSlice = createSlice({
name: "switchers",
initialState,
reducers:
{ setIsAuth(state){
    state.isAuth = !state.isAuth;
},
setIsSidebarOpen(state){
    state.isSidebarOpen = !state.isSidebarOpen;
}
}
})

export const switcherActions = SwitcherSlice.actions;

export default SwitcherSlice.reducer;