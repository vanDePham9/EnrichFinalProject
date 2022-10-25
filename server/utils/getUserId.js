require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (token) => {
  try {
    let userID = '';
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        return null;
      } else {
        userID = decoded._id;
      }
    });
    return userID;
  } catch (err) {
    console.log(err);
    return null;
  }
};