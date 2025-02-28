import express, { Request } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { varifyToken } from "../utils/Token.js";
import UserModel, { IUser } from "../models/UserModel.js";
import { Document } from "mongoose";

export interface AuthRequest extends Request {
  user?: Document & IUser;
}

export const Auth = catchAsync(async (req: AuthRequest, res, next) => {
  const { languageToken } = req.cookies;
  if (!languageToken) throw new ErrorHandler(401, "You are not logged in");
  const id = varifyToken(languageToken);
  const user = await UserModel.findById(id);
  if (!user) throw new ErrorHandler(404, "user not found !");
  req.user = user;
  next();
});
