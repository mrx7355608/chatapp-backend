import cors from "cors";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import express, { Application } from "express";
import { catch404, errorHandler } from "@middlewares/errorHandler";

const app: Application = express();

app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "public")));

// Routes

// Error handler
app.use(catch404);
app.use(errorHandler);

export default app;
