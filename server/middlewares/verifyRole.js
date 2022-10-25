require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const managerRole = ['admin', 'productManager']
exports.verifyAdminRole = (request, response, next) => {
  const token = request.header("Authorization");
  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        return response.status(401).send({ message: "Access Denied" });
      } else {
        User.findById(decoded._id, (err, User) => {
          if (err) res.send(err);
          if (User.role !== 'admin') {
            return response
              .status(400)
              .send({ message: "You are not admin." });
          }
          next();
        });
      }
    });
  } catch (err) {
    return response.status(403).send({ message: "Verify role error." });
  }
};

exports.verifyProductManagerRole = (request, response, next) => {
  const token = request.header("Authorization");
  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        return response.status(401).send({ message: "Access Denied" });
      } else {
        User.findById(decoded._id, (err, User) => {
          if (err) res.send(err);
          if (!managerRole.includes(User.role)) {
            return response
              .status(400)
              .send({ message: "You are not product manager." });
          }
          next();
        });
      }
    });
  } catch (err) {
    return response.status(403).send({ message: "Verify role error." });
  }
};
