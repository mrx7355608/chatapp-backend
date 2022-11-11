import { Router } from "express";
import controller from "./controller";

const roomRouter = Router();

// Return some data of room
roomRouter.get("/:roomid", controller.httpGetRoomData);

// Return room users
roomRouter.get("/:roomid/users", controller.httpGetRoomUsers);

// Return room messages
roomRouter.get("/:roomid/messages");

// Create a new room
roomRouter.post("/create", controller.httpCreateRoom);

// Join room
roomRouter.post("/join", controller.httpJoinRoom);

// Delete the room
roomRouter.post("/:id/delete");

export default roomRouter;
