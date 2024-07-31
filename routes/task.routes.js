const express = require("express");
const { taskModel } = require("../models/task.model");
const { isAuthenticated } = require("../middlewares/authentication");
const taskRouter = express.Router();

//! getting all task of a user

taskRouter.get("/get", isAuthenticated, async (req, res) => {
  const userId = req.user.id;

  try {
    let tasks = await taskModel.find({ user: userId }).select("-user");
    return res.status(200).send({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

//! adding a new task
taskRouter.post("/add", isAuthenticated, async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;
  const userId = req.user.id;

  try {
    let newTask = new taskModel({
      user: userId,
      title,
      description,
      status,
      priority,
      deadline,
    });
    await newTask.save();
    return res.status(201).send({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something went wrong" });
  }
});

//! edit a task
taskRouter.patch("/edit/:taskId", isAuthenticated, async (req, res) => {
  const { taskId } = req.params;

  try {
    let task = await taskModel.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    await taskModel.findByIdAndUpdate(taskId, req.body);
    return res.status(200).send({
      message: "Task updated successfully",
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

//! delete a task

taskRouter.delete("/delete/:taskId", isAuthenticated, async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  try {
    let task = await taskModel.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    return res.status(200).send({
      message: "Task deleted successfully",
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = {
  taskRouter,
};
