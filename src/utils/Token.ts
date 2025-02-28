import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const createToken = (id: mongoose.Types.ObjectId): string => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: process.env.JWT_EXP as jwt.SignOptions["expiresIn"],
  });
  return token;
};

export const varifyToken = (token: string) => {
  const { id } = jwt.verify(token, String(process.env.JWT_SECRET)) as {
    id: string;
  };
  return id;
};
