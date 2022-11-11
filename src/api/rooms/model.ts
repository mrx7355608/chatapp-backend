import mongoose from "mongoose";
import { RoomInterface } from "./interfaces";

const roomUsersSchema = new mongoose.Schema({
	username: String,
	photo: String,
});

const roomSchema = new mongoose.Schema({
	name: String,
	admin: mongoose.Schema.Types.ObjectId,
	users: [roomUsersSchema],
	bannedUsers: [String],
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	}],
}, { timestamps: true })

const RoomModel = mongoose.model<RoomInterface>('Room', roomSchema);

export default RoomModel;
