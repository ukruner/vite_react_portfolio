import { configureStore } from "@reduxjs/toolkit";
import marqueeSlice from "./slices/marqueeSlice";
import switcherSlice from "./slices/switchers"

const mainStore = configureStore({reducer:
    {marqueeSign: marqueeSlice, switcherSlice: switcherSlice}
})

export default mainStore;