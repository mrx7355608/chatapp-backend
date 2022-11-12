import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export interface TokenPayload extends JwtPayload {
    userid: mongoose.Schema.Types.ObjectId;
}
