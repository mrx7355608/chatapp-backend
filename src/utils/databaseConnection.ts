import config from "@config/index";
import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(config.DATABASE_URL as string, () =>
        console.log("[INFO] Connected to database")
    );
    mongoose.connection.on("error", (err) =>
        console.log("[INFO] MongoDB connection error", err)
    );
};

export default connectDB;
