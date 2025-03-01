import { Request, Response, NextFunction } from "express";

// Custom Error Handler Middleware
export const errorHandlerMiddleware = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let message = err.message || "Internal Server Error";
    let status = err.statusCode || 500;

    // Handle MongoDB Duplicate Key Error (Code: 11000)
    if (err.code === 11000) {
      const [field] = Object.keys(err.keyValue);
      message = `${field} already in use!`;
      status = 400; // Bad Request
    }

    // Handle Mongoose Validation Errors
    else if (err.name === "ValidationError") {
      message = Object.values(err.errors)
        .map((e: any) => e.message)
        .join(", ");
      status = 400; // Bad Request
    }

    // Handle Unauthorized Errors
    else if (err.name === "JsonWebTokenError") {
      message = "Invalid token. Please log in again.";
      status = 401;
    } else if (err.name === "TokenExpiredError") {
      message = "Token has expired. Please log in again.";
      status = 401;
    }

    // Handle Mongoose Cast Errors (e.g., Invalid ObjectId)
    else if (err.name === "CastError") {
      message = `Invalid ${err.path}: ${err.value}`;
      status = 400;
    }
    // Handle Other Known Errors
    else if (err.statusCode) {
      status = err.statusCode;
    }

    // Log the error (Only in development mode)
    if (process.env.NODE_ENV !== "production") {
      console.error(err);
    }

    // Send JSON response
    res.status(status).json({ success: false, message });
  } catch (error) {
    console.error("Error in errorHandlerMiddleware:", error);
    next(error);
  }
};
