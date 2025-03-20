import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "../state-slice/settingsSlice";
import taskReducer from "../state-slice/taskSlice";
import summarySlice from "../state-slice/summarySlice.js";
import profileSlice from "../state-slice/profileSlice.js";

export default configureStore({
    reducer:{
        settings:settingsReducer,
        task:taskReducer,
        summary:summarySlice,
        profile:profileSlice
    }
})