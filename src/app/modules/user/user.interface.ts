/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { userRoles } from "./user.constant";

export interface TUser {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    role: "admin" | "faculty" | "student";
    status: "in-progress" | "blocked";
    isDeleted: boolean;
}

export type TUserRoles = keyof typeof userRoles;

export interface UserModel extends Model<TUser> {
    isUserExistByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(plainTextPass: string, hasPass: string): Promise<boolean>;
}
