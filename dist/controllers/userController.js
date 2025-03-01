import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/Token.js";
import { catchAsync } from "../utils/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";
export const userRegister = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, Number(process.env.SALTROUND) || 10);
    const user = new UserModel({
        username,
        email,
        password: encryptedPassword,
    });
    const data = await user.save();
    const resData = await UserModel.findById(data._id);
    const token = createToken(data._id);
    res
        .status(200)
        .cookie("languageToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .json({
        message: "Registered and Logined Successfully!",
        data: resData,
    });
});
export const userLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const isUser = await UserModel.findOne({ email }).select("+password");
    if (!isUser)
        throw new ErrorHandler(404, "invalide email or password !");
    const isPassword = bcrypt.compareSync(password, isUser.password);
    if (!isPassword)
        throw new ErrorHandler(404, "invalide email or password !");
    const data = await UserModel.findOne({ email });
    const token = createToken(data?._id);
    res
        .status(200)
        .cookie("languageToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
        .json({
        message: "Logined Successfully!",
        data,
    });
});
export const getUserDetails = catchAsync(async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});
export const userLogout = catchAsync(async (req, res, next) => {
    res
        .status(200)
        .cookie("languageToken", null, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
    })
        .json({
        message: "Logout Successfully!",
    });
});
