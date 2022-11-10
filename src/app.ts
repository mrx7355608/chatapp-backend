import cors from "cors";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import express, { Application } from "express";

const app: Application = express();

app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

export default app;
