import { createSlice } from "@reduxjs/toolkit";


const initialState = {isAuth: false, isSidebarOpen: false, isMarqueeActive: false, isAiThinking: false, navBarLayer: 0, scrollToValue: null, isChatBoxOpen: false, chatBotOnline: false, routeParallax: false, routeHeader: false, routeSidebar: false}
const switcherSlice = createSlice({
name: "switchers",
initialState,
reducers:
{ setIsAuth(state){
    state.isAuth = !state.isAuth;
},
setIsSidebarOpen(state, action){
    if (action.payload) {
        state.isSidebarOpen = action.payload;
    }
    if (!state.isSidebarOpen){
        state.isSidebarOpen = true;
    }
    else {
        state.isSidebarOpen = false;
    }
    
    },
    setIsAiThinking(state){
        state.isAiThinking = !state.isAiThinking;
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
},
setRouteParallax(state){
    state.routeParallax = !state.routeParallax
},
setRouteHeader(state){
    state.routeHeader = !state.routeHeader
},
setRouteSidebar(state){
    state.routeSidebar = !state.routeSidebar
}
}
})

export const switcherActions = switcherSlice.actions;

export default switcherSlice.reducer;