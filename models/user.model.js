const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
      default: () => Date.now(),
    },
  },
  { versionKey: false, timestamp: false }
);

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
