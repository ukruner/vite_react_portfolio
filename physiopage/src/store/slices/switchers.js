import { createSlice } from "@reduxjs/toolkit";


const initialState = {isAuth: false, isSidebarOpen: false, sessionTerminated: false, isAiThinking: false, navBarLayer: 0, scrollToValue: null, isChatBoxOpen: false, chatBotOnline: false, routeParallax: false, routeHeader: false, routeSidebar: false}
const switcherSlice = createSlice({
name: "switchers",
initialState,
reducers:
{ setIsAuth(state){
    state.isAuth = !state.isAuth;
},
setIsSidebarOpen(state, action){
 
    state.isSidebarOpen = action.payload;
    },
    setIsAiThinking(state, action){
        state.isAiThinking = action.payload;
    },
    
setMarqueeActive(state, action){
    state.isMarqueeActive = action.payload;

},
setNavBarLayer(state, action){
    state.navBarLayer = action.payload;
},
setSessionTerminated(state, action){
    state.sessionTerminated = action.payload
},
setScrollToValue(state, action){
    state.scrollToValue = action.payload;
},
setChatBoxOpen(state, action){
    state.isChatBoxOpen = action.payload;
},
setChatBotOnline(state, action){
    state.chatBotOnline = action.payload;
},
setRouteParallax(state, action){
    state.routeParallax = action.payload;
},
setRouteHeader(state, action){
    state.routeHeader = action.payload
},
setRouteSidebar(state, action){
    state.routeSidebar = action.payload
}
}
})

export const switcherActions = switcherSlice.actions;

export default switcherSlice.reducer;