import { configureStore} from "@reduxjs/toolkit";
import switcherSlice from "./slices/switchers";
import chatSlice from "./slices/chatSlice";
import userSlice from "./slices/userSlice";

const mainStore = configureStore({reducer:
    {switcherSlice: switcherSlice, chatSlice: chatSlice, userSlice: userSlice},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
})

export default mainStore;