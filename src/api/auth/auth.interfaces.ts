import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export interface TokenPayload extends JwtPayload {
    id: mongoose.Schema.Types.ObjectId;
}
