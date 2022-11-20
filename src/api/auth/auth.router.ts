import { Router } from "express";
import authController from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.httpLogin);
authRouter.post("/signup", authController.httpSignup);
authRouter.post("/logout", authController.httpLogout);
authRouter.post("/refresh-token", authController.httpRefreshToken);
authRouter.post("/forgot-password", authController.httpForgotPassword);
authRouter.post("/reset-password", authController.httpResetPassword);

export default authRouter;
