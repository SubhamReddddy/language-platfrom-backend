import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the User model
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Create the User schema
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Adjust based on security needs
      select: false,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create the User model
const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
