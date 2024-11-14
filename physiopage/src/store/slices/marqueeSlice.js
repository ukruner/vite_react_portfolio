import { createSlice } from "@reduxjs/toolkit";




const initialState = {marqueeSign: undefined}
const marqueeSlice = createSlice({
name: "marquee",
initialState,
reducers:
{ setMarqueeSign(state, action){
    state.marqueeSign = action.payload;
}}
})

export const marqueeActions = marqueeSlice.actions;

export default marqueeSlice.reducer;