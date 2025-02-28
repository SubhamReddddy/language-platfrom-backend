import mongoose, { Error } from "mongoose";

const connnectToDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://subhamreddy121:${process.env.MONGODBPASS}@cluster0.5lxky.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/language`
    );
    console.log("connected to mongodb!");
  } catch (error) {
    if (error instanceof Error) {
      console.log("mongodb error:", error.message);
    } else if (error instanceof Error) {
      console.log("general error:", error.message);
    }
  }
};

export default connnectToDB;
