import { createSlice } from "@reduxjs/toolkit";


const initialState = {history: []};

const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers:{
        clearState(state){
        state.history = [{sender: "ai", text: "Thank you for using Gemini today. Hope you had your questions answered. Now, pressing 'finish session' below will terminate this conversation"}]}
    ,
        resetState(){
        return initialState;
        },
        
        updateHistory(state, action){
            state.history.push(action.payload)
        }}


});

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;