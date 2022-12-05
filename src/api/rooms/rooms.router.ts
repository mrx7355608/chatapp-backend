import isAuth from "@middlewares/isAuth";
import { Router } from "express";
import controller from "./rooms.controller";

const roomRouter = Router();

// Authentication middleware
roomRouter.use(isAuth);

// Return some data of room
roomRouter.get("/:roomid", controller.httpGetRoomData);

// Return room users
roomRouter.get("/:roomid/users", controller.httpGetRoomUsers);

// Return room messages
roomRouter.get("/:roomid/messages", controller.httpGetRoomMessages);

// Create a new room
roomRouter.post("/create", controller.httpCreateRoom);

// Join room
roomRouter.post("/join", controller.httpJoinRoom);

export default roomRouter;
