import mongoose from "mongoose";

const taskScheme = new mongoose.Schema({
Id: {
    type: Number,
    required: true,
    unique: true,
    minlength: 1,
    validate: {
        validator: function (value) {
          return value > 0;
        },
        message: "Id must be a positive number",
      },
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  completed:{
    type: Boolean,
    default: false,
    },
  } 
);



const Task = mongoose.model("Task", taskScheme);
export default Task;