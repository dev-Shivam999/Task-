import mongoose from "mongoose";


export const DB = async () => {
    try {
        await mongoose.connect(`${process.env.DB}`, )
        console.log("db connection established");

    } catch (error) {
        console.log("db error: " + error);

    }

}