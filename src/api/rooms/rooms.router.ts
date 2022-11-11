import { Router } from "express";
import controller from "./rooms.controller";

const roomRouter = Router();

// Return some data of room
roomRouter.get("/:roomid", controller.httpGetRoomData);

// Return room users
roomRouter.get("/:roomid/users", controller.httpGetRoomUsers);

// Return room messages
roomRouter.get("/:roomid/messages", controller.httpGetRoomMessages);

// Add received messages in room
roomRouter.post("/:roomid/add-message", controller.httpAddMessage);

// Create a new room
roomRouter.post("/create", controller.httpCreateRoom);

// Join room
roomRouter.post("/join", controller.httpJoinRoom);

// Delete the room
roomRouter.post("/:id/delete");

export default roomRouter;
