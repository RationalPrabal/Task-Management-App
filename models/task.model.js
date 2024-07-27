const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["To-Do", "In Progress", "Under Review", "Completed"],
    required: true,
    default: "To-Do",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "Urgent"],
  },
  deadline: {
    type: Number,
  },
});
const taskModel = mongoose.model("task", taskSchema);

module.exports = {
  taskModel,
};
