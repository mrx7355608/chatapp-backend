import { Router } from "express";
import isAuth from "@middlewares/isAuth";
import controller from "./users.controller";

const userRouter = Router();

userRouter.use(isAuth);
userRouter.get("/", controller.httpGetUser);

export default userRouter;
