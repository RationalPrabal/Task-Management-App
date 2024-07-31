require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const http = require("http");
const authRouter = require("./routes/auth.routes");
const { taskRouter } = require("./routes/task.routes");
const { connection } = require("./config/Database");
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authRouter);
app.use("/task", taskRouter);

server.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database connected");
  } catch (err) {
    console.log("Database connection error");
  }
  console.log(`Server is up and running at ${PORT}`);
});
