import { configureStore} from "@reduxjs/toolkit";
import marqueeSlice from "./slices/marqueeSlice";
import switcherSlice from "./slices/switchers";
import chatSlice from "./slices/chatSlice";
import userSlice from "./slices/userSlice";

const mainStore = configureStore({reducer:
    {marqueeSign: marqueeSlice, switcherSlice: switcherSlice, chatSlice: chatSlice, userSlice: userSlice},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
})

export default mainStore;