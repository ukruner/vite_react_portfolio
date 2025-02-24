import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';


const initialState = {chatId: null, history: []};

const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers:{
        clearState(state){
        return {chatId: null, history: [{sender: "ai", text: "Thank you for using Gemini today. Hope you had your questions answered. Now, pressing 'finish session' below will terminate this conversation"}]}
    },
        resetState(state){
            return {chatId: null, history: []}
        },
        setChatId(state, action){
            state.chatId = action.payload
        },
        updateHistory(state, action){
            state.history.push(action.payload)
        }


}
})

export const chatActions = chatSlice.actions;

export default chatSlice.reducer;