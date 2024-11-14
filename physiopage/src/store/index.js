import { configureStore } from "@reduxjs/toolkit";
import marqueeSlice from "./slices/marqueeSlice";

const mainStore = configureStore({reducer:
    {marqueeSign: marqueeSlice}
})

export default mainStore;