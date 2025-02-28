import jwt from "jsonwebtoken";
export const createToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP,
    });
    return token;
};
export const varifyToken = (token) => {
    const { id } = jwt.verify(token, String(process.env.JWT_SECRET));
    return id;
};
