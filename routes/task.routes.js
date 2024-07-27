const express = require("express");
const { taskModel } = require("../models/task.model");
const taskRouter = express.Router();

//! getting all task of a user

taskRouter.get("/get", async (req, res) => {
  const userId = req.user.id;

  try {
    let tasks = await taskModel.find({ user: userId });
    return res.status(200).send({
      message: "Tasks retrieved successfully",
      tasks,
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

//! adding a new task
taskRouter.post("/add", async (req, res) => {
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
    return res.status(500).send({ message: "Something went wrong" });
  }
});

//! edit a task
taskRouter.put("/edit/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  try {
    let task = await taskModel.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    let updatedTask = await taskModel.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    return res.status(200).send({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

//! delete a task

taskRouter.delete("/delete/:taskId", async (req, res) => {
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
