// external inport
import mongoose from "mongoose";

// internal inport
import { DB_NAME } from "../constants.js";

// connect database
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );
        console.log(
            `\nmongodb connection is success! \nDB HOST : ${connectionInstance.connection.host} `
        );
    } catch (error) {
        console.log("mongodb connection error :", error);
        process.exit(1);
    }
};

export default connectDB;
