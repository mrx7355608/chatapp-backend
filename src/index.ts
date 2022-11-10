import "module-alias/register";
import "dotenv/config";

import http from "http";
import app from "./app";
import config from "@config/index";
import connectDB from "@utils/databaseConnection";

const httpServer = http.createServer(app);
const PORT = config.PORT;

const startServer = () => {
    // database connection
    connectDB();
    // Listen on server
    httpServer.listen(PORT, () =>
        console.log(`[INFO] Server listening on port ${PORT}`)
    );
};

startServer();
