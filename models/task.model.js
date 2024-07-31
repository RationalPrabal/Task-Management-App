const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
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
      enum: ["toDo", "inProgress", "underReview", "finished"],
      required: true,
      default: "toDo",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "Urgent", ""],
    },
    deadline: {
      type: Number,
    },
    createdAt: {
      type: Number,
      default: () => Date.now(),
    },
  },
  { versionKey: false, timestamp: false }
);
const taskModel = mongoose.model("task", taskSchema);

module.exports = {
  taskModel,
};
