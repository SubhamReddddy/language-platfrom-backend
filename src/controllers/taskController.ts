import { AuthRequest } from "../Features/Auth.js";
import { taskModel } from "../models/TaskModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const addtask = catchAsync(async (req: AuthRequest, res, next) => {
  const { data, result } = req.body;
  const task = await taskModel.findOneAndUpdate(
    { userID: req.user?._id },
    { $push: { carrier: { task: data, ans: result } } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(200).json({
    task,
  });
});

export const getalltask = catchAsync(async (req: AuthRequest, res, next) => {
  const tasks = await taskModel.findOne({ userID: req.user?._id });
  if (!tasks) throw new ErrorHandler(404, "no task found");
  res.status(200).json({
    tasks,
  });
});
