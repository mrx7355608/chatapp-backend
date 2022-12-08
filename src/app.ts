import cors from "cors";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { Application } from "express";
import { catch404, errorHandler } from "@middlewares/errorHandler";

const app: Application = express();

app.use(morgan("dev"));
app.use(compression());
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);
app.use(
    cors({
        origin: "http://localhost:4173",
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/media", express.static(path.join(__dirname, "..", "public")));

// Routes
import roomRouter from "@api/rooms/rooms.router";
import authRouter from "@api/auth/auth.router";
import userRouter from "@api/users/users.router";

app.use("/rooms", roomRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

// Error handler
app.use(catch404);
app.use(errorHandler);

export default app;
