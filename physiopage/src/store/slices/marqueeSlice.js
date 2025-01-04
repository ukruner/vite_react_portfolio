import { createSlice } from "@reduxjs/toolkit";




const initialState = {marqueeSign: undefined}
const marqueeSign = createSlice({
name: "marquee",
initialState,
reducers:
{ setMarqueeSign(state, action){
    state.marqueeSign = action.payload;
}}
})

export const marqueeActions = marqueeSign.actions;

export default marqueeSign.reducer;