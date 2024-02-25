import mongoose from "mongoose";

const taskScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model("Task", taskScheme);
export default Task;
