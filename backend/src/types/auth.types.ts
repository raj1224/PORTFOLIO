import type { IUser } from "../models/user.model.js";

export interface JwtPayload {
  userId: string;
  role: IUser["role"];
}