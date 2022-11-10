import config from "@config/index";
import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(config.DATABASE_URL, () =>
        console.log("[INFO] Connected to database")
    );
    mongoose.connection.on("error", () =>
        console.log("[INFO] MongoDB connection error")
    );
};

export default connectDB;
