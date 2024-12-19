import { configureStore } from "@reduxjs/toolkit";
import St from "./data"
export const store =configureStore({
    reducer:{
        data:St
    }
})