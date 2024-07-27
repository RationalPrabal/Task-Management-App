require("dotenv").config();
const express = require("express");
const { userModel } = require("../models/user.model");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

//! register new user
authRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send({ message: "User already registered" });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).send({ message: "Something went wrong" });
      } else if (hash) {
        let newUser = new userModel({
          email,
          password: hash,
          name,
        });
        await newUser.save();

        let token = jwt.sign(
          { email: newUser.email, id: newUser._id },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.status(201).send({
          message: "Registration successful",
          token,
        });
      }
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

//! login user
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    let token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).send({
      message: "Login successful",
      token,
    });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = authRouter;
