import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["admin", "faculty", "student"]
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        default: "in-progress"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// documents middlewares
userSchema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    // encrypting user's password
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    next();
});

userSchema.post("save", function (user, next) {
    user.password = "";
    next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
    return await User.findOne({ id }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (plainTextPass: string, hasPass: string) {
    return await bcrypt.compare(plainTextPass, hasPass);
};

export const User = model<TUser, UserModel>("User", userSchema);
