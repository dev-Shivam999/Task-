import mongoose from "mongoose";


export const DB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/TodayTask")
        console.log("db connection established");

    } catch (error) {
        console.log("db error: " + error);

    }

}