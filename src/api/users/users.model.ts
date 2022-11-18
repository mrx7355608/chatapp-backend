import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserInterface } from "./users.interfaces";

const userSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
    },
    { toJSON: { virtuals: true }, id: false }
);

// create a username index
userSchema.index({ username: 1 });

// Give user a random photo
userSchema.pre("save", function (next) {
    if (!this.isNew) return next();
    const randomNumber = Math.floor(Math.random() * 7);
    this.photo = `/media/images/photo-${randomNumber}.jpg`;
    next();
});

// Hash password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
});

// Validate password
userSchema.methods.isValidPassword = async function (
    inputPassword: string
): Promise<Boolean> {
    return await bcrypt.compare(inputPassword, this.password);
};

// A virtual property for fullname
userSchema.virtual("fullname").get(function (): string {
    const firstName: string =
        this.fname.substring(0, 1).toUpperCase() + this.fname.substring(1);
    const lastName: string =
        this.lname.substring(0, 1).toUpperCase() + this.lname.substring(1);
    return `${firstName} ${lastName}`;
});

const UserModel = mongoose.model<UserInterface>("User", userSchema);

export default UserModel;
