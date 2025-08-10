import { configureStore} from "@reduxjs/toolkit";
import marqueeSlice from "./slices/marqueeSlice";
import switcherSlice from "./slices/switchers";
import chatSlice from "./slices/chatSlice";

const mainStore = configureStore({reducer:
    {marqueeSign: marqueeSlice, switcherSlice: switcherSlice, chatSlice: chatSlice},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
})

export default mainStore;