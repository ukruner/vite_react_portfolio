import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

const initialState = {isAuth: false, isSidebarOpen: false, isMarqueeActive: false, isAiThinking: false, navBarLayer: 0, scrollToValue: null, isChatBoxOpen: false, chatBotOnline: false}
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
    setIsAiThinking(state){
        state.isAiThinking = !state.isAiThinking;
        console.log('changing AI thinking value ' + state.isAiThinking)
    },
    
setMarqueeActive(state){
    state.isMarqueeActive = !state.isMarqueeActive;

},
setNavBarLayer(state, action){
    state.navBarLayer = action.payload; 
},
setScrollToValue(state, action){
    state.scrollToValue = action.payload;
},
setChatBoxOpen(state){
    state.isChatBoxOpen = !state.isChatBoxOpen;
},
setChatBotOnline(state){
    state.chatBotOnline = !state.chatBotOnline;
}
}
})

export const switcherActions = switcherSlice.actions;

export default switcherSlice.reducer;