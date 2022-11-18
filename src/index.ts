import "module-alias/register";
import "dotenv/config";

import http from "http";
import app from "./app";
import config from "@config/index";
import { Server } from "socket.io";
import connectDB from "@utils/databaseConnection";
import setupSocketServer from "./socketServer";

const PORT = config.PORT;
const httpServer = http.createServer(app);
setupSocketServer(httpServer); // socketio server setup

const startServer = () => {
    // database connection
    connectDB();
    // Listen on server
    httpServer.listen(PORT, () =>
        console.log(`[INFO] Server listening on port ${PORT}`)
    );
};

startServer();
