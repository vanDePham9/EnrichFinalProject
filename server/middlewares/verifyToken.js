require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const token = request.header("Authorization");

  if (!token) return response.status(401).send({ message: "Access Denied" });

  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        response.status(401).send({ message: "Access Denied" });
      } else {
        request.userID = decoded._id;
        request.isLoggedIn = true;
        next();
      }
    });
  } catch (err) {
    return response.status(400).send({ message: "Invalid Token" });
  }
};
