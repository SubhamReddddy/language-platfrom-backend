import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
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
                type: (Array),
            },
        },
    ],
});
export const taskModel = mongoose.model("task", taskSchema);
