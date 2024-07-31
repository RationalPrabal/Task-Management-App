const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");

const isAuthenticated = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      }

      try {
        const user = await userModel.findById(decoded.id);
        if (!user) {
          return res.status(401).send({ message: "User not found" });
        }

        req.user = user;
        next();
      } catch (error) {
        res.status(500).send({ message: "Internal server error" });
      }
    });
  } else {
    res.status(401).send({ message: "Authorization token is missing" });
  }
};

module.exports = {
  isAuthenticated,
};
