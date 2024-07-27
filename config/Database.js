require("dotenv").config();

const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.Mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  connection,
};
