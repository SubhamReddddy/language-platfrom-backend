import mongoose from "mongoose";

export interface taskType extends Document {
  userID: typeof mongoose.Types.ObjectId;
  carrier: Array<{
    task: Array<{ word: String; meaning: String }>;
    ans: Array<String>;
  }>;
}

const taskSchema = new mongoose.Schema<taskType>({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carrier: [
    {
      task: [
        {
          word: String,
          meaning: String,
        },
      ],
      ans: {
        type: Array<String>,
      },
    },
  ],
});

export const taskModel = mongoose.model("task", taskSchema);
