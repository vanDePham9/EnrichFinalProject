require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Token = require("../models/tokenSchema");
const crypto = require("crypto");
const { registerValidator } = require("./../validations/auth");
const { sendMail } = require("../services/sendMail");
const { hashUserPassword } = require("../utils/hashPassword");

/**
 * @api {post} /auth/register Register
 * @apiVersion 0.1.0
 * @apiName Register
 * @apiGroup Authentication
 * @apiPermission application
 * 
 * @apiBody {String} email The user email who want to register.
 * @apiBody {String} password The user password.
 * @apiBody {String} [role] The role of user (`admin` or `productManager` or `regularUser`). Default: `regularUser`.
 * 
 * @apiParamExample {json} Input
 *    {
 *         "email": "depvadmin@getnada.com",
 *         "password": "Matkhau@123",
 *         "role": "admin"
 *     }
 *
 * @apiSuccess {[NewUser](#api-Types-ObjectNewuser)} newUser Id of the cart.
 * @apiSuccess {String} token The user token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "newUser": {
 *             "email": "depvadmin@getnada.com",
 *             "password": "$2a$10$spleQFMMbU5aoRMjAhz/I.0Hd05Sp0HxjaRt3ACE/BiFex3Qg3YgS",
 *             "role": "admin",
 *             "_id": "6357a477d8509ce1b28c4fa2",
 *             "createdDate": "2022-10-25T08:55:19.788Z",
 *             "updatedDate": "2022-10-25T08:55:19.789Z",
 *             "__v": 0
 *         },
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzU3YTQ3N2Q4NTA5Y2UxYjI4YzRmYTIiLCJpYXQiOjE2NjY2ODgxMTksImV4cCI6MTY2Njc3NDUxOX0.6m6Q4xkiFEh6MaNros1PewBeD0-JBYAMeo25UPizNqk"
 *     }
 *
 *
 * @apiUse AuthError
 *
 */

/**
 * @api {post} /auth/login Login
 * @apiVersion 0.1.0
 * @apiName Login
 * @apiGroup Authentication
 * @apiPermission application
 * 
 * @apiBody {String} email The user email who want to register.
 * @apiBody {String} password The user password.
 * 
 * @apiParamExample {json} Input
 *    {
 *         "email": "depvadmin@getnada.com",
 *         "password": "Matkhau@123",
 *     }
 *
 * @apiSuccess {String} token The user token.
 * @apiSuccess {String} refreshToken  The userId of cart.
 * @apiSuccess {[ShortUser](#api-Types-ObjectShortuser)} user  The short info about user just logged in.
 * @apiSuccess {String} message  The message notify user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzU3YTQ3N2Q4NTA5Y2UxYjI4YzRmYTIiLCJpYXQiOjE2NjY3NzU3OTgsImV4cCI6MTY2Njg2MjE5OH0.guqL6HliufU13k1Ga-vJ-AJKJpGfvrE-DRQPgpf2_XU",
 *         "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzU3YTQ3N2Q4NTA5Y2UxYjI4YzRmYTIiLCJpYXQiOjE2NjY3NzU3OTgsImV4cCI6MTY2NzM4MDU5OH0.Z-9MZy7uBLsfhVOLi5kxJtupNdG1xrDaDzuBGxhAzkQ",
 *         "user": {
 *             "_id": "6357a477d8509ce1b28c4fa2",
 *             "email": "depvadmin@getnada.com",
 *             "role": "admin"
 *         },
 *         "message": "Login successfully"
 *     }
 *
 * @apiUse AuthError
 *
 */

/**
 * @api {post} /auth/refresh Refresh Token
 * @apiVersion 0.1.0
 * @apiName Refresh
 * @apiGroup Authentication
 * @apiPermission application
 * 
 * @apiBody {String} refreshToken The refreshToken return from [Login](#api-Authentication-Login).
 * 
 * @apiParamExample {json} Input
 *    {
 *       "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJiMjAwNWI1ODI0YTliZjVlMGU3YmUiLCJpYXQiOjE2NjM3NzMzNDEsImV4cCI6MTY2NDM3ODE0MX0.Q3jtofyZyA8fHiIPykijcueU4X_hdG4Wu2xVM9aNGYc"
 *    }
 *
 * @apiSuccess {String} token The new token just generated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzU3YTQ3N2Q4NTA5Y2UxYjI4YzRmYTIiLCJpYXQiOjE2NjY3Nzk2NTYsImV4cCI6MTY2Njg2NjA1Nn0.84hoVy12PFLEsVBJE7uxsxFw4QJrkukMs4iEauZrH60"
 *     }
 *
 * @apiUse AuthError
 *
 */

/**
 * @api {post} /auth/reset-password Reset password
 * @apiVersion 0.1.0
 * @apiName Reset
 * @apiGroup Authentication
 * @apiPermission application
 * 
 * @apiBody {String} email The user email who want to reset password.
 * @apiBody {String} password The user password.
 * 
 * @apiParamExample {json} Input
 *    {
 *         "email": "depvadmin@getnada.com",
 *    }
 *
 * @apiSuccess {String} email The email of user.
 * @apiSuccess {String} resetPassword  The password suggested from system.
 * @apiSuccess {String} message  The message notify you to check your email box to get link confirm reset use to [ConfirmReset](#api-Authentication-ConfirmReset) body.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "email": "depvadmin@getnada.com",
 *         "resetPassword": "8164d7152aec717911f820f55796d814f2f9349e",
 *         "message": "Link password reset just sent to your email box. Please check it out."
 *     }
 *
 * @apiUse AuthError
 *
 */

/**
 * @api {post} /auth/reset-password/:userId/:token Confirm Reset password
 * @apiDescription Get link from email box and paste it in URL sample request.
 * @apiVersion 0.1.0
 * @apiName ConfirmReset
 * @apiGroup Authentication
 * @apiPermission application
 * 
 * @apiParam {String} userId The id of user.
 * @apiParam {String} token The token sent from [Reset](#api-Authentication-Reset) APIs. Check your email to get it.
 * 
 * @apiBody {String} password The new password you want to reset. You can you password suggested in [Reset](#api-Authentication-Reset) response.
 * 
 * @apiParamExample {json} Input
 *    {
 *         "password": "MatKhauDayNhe@123"
 *    }
 *
 * @apiSuccess {String} message  The message notify reset password successfully. 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "password reset successfully."
 *     }
 *
 * @apiUse AuthError
 *
 */

/**
 * @api {post} /auth/change-password Change password
 * @apiVersion 0.1.0
 * @apiName Change
 * @apiGroup Authentication
 * @apiPermission application
 * 
 * @apiBody {String} email The email user.
 * @apiBody {String} oldPassword The old password of user account.
 * @apiBody {String} newPassword The new password of user account.
 * 
 * @apiParamExample {json} Input
 *    {
 *         "email": "depvadmin@getnada.com",
 *         "oldPassword": "51b81682b8ba357041de7271ca8c8bbb81b33bf9ae47a46435753fb8a5e0156d",
 *         "newPassword": "Matkhau@123456"
 *    }
 *
 * @apiSuccess {String} email  The message notify reset password successfully. 
 * @apiSuccess {String} oldPassword  The message notify reset password successfully. 
 * @apiSuccess {String} newPassword  The message notify reset password successfully. 
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "result": {
 *             "_id": "6357a477d8509ce1b28c4fa2",
 *             "email": "depvadmin@getnada.com",
 *             "password": "$2a$10$IlDCPyX6wjsOlxqdJUmJ2.sF5OEFx2Ph9dR37LI66VMyYMuk/5ie.",
 *             "role": "admin",
 *             "createdDate": "2022-10-25T08:55:19.788Z",
 *             "updatedDate": "2022-10-25T08:55:19.789Z",
 *             "__v": 0
 *         }
 *     }
 *
 * @apiUse AuthError
 *
 */


exports.register = async (request, response) => {
  try {
    const { error } = registerValidator(request.body);
    const { email, password, role } = request.body;
    if (error) return response.status(422).send(error.details[0].message);
    const checkEmailExist = await User.findOne({ email });
    if (checkEmailExist) return response.status(422).send("Email is exist");
    const hashPassword = await hashUserPassword(password);
    const user = new User({
      email,
      password: hashPassword,
      role,
    });
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    if (role === "admin") { 
      const mailOptions = {
        from: 'phamde9299@gmail.com',
        to: email,
        subject: "Wellcome admin!",
        html: "<h3>You have control to manage user in my application!</h3>",
      };
      await sendMail(mailOptions);
    }
    const newUser = await user.save();

    return response.send({ newUser, token});
  } catch (error) {
    return response.status(400).send(error);
  }
};
exports.login = async (request, response) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      return response.status(422).send({ message: "Email or Password is not correct" });
    };
    const checkPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (!checkPassword) {
      return response.status(422).send({ message: "Email or Password is not correct" });
    };
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    return response.status(200).send({
      token,
      refreshToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "Login successfully",
    });
  } catch (error) {
    console.log("loginError: ", error);
    return response.status(400).send({
      message: "Login failure",
    });
  }
};

exports.refreshToken = async (request, response) => {
  try {
    const { refreshToken } = request.body;
    let userId;
    if (refreshToken) {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY,
        (err, decoded) => {
          if (err) {
            console.log(err);
            return response.status(401).send({ message: "Access Denied" });
          } else {
            userId = decoded._id;
          }
        }
      );
    }
    const token = jwt.sign({ _id: userId }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });

    return response.status(200).send({ token });
  } catch (error) {
    console.log("RefreshTokenError: ", error);
    return response.status(400).send({
      message: "Refresh token failure",
    });
  }
};

exports.changePassword = async (request, response) => {
  try {
    const { email, oldPassword, newPassword } = request.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser) return response.status(403).send("User not found!");
    const checkPassword = await bcrypt.compare(
      oldPassword,
      existedUser.password
    );
    if (!checkPassword) {
      return response.status(422).send({ message: "Old password is not correct!" });
    };
    const hashPassword = await hashUserPassword(newPassword);
    const result = await User.findOneAndUpdate(
      { _id: existedUser._id },
      {
        password: hashPassword,
      },
      { new: true }
    ).exec();
    const mailOptions = {
      to: email,
      subject: "Change password successfully!",
      html: "<h3>Your password already changed</h3>",
    };
    await sendMail(mailOptions);

    return response.status(200).send({ result });
  } catch (error) {
    console.log("ChangePasswordError: ", error);
    return response.status(400).send({
      message: "Change password failure",
    });
  }
};

exports.resetPassword = async (request, response) => {
  try {
    const { email } = request.body;
    const existedUser = await User.findOne({ email });
    if (!existedUser) return response.status(403).send("User not found!");
    const randomPassword = crypto.randomBytes(20).toString('hex');
    let token = await Token.findOne({ userId: existedUser._id });
    if (!token) {
      token = await new Token({
          userId: existedUser._id,
          token: crypto.randomBytes(32).toString("hex"),
      }).save();
    };
    const link = `${process.env.BASE_URL}/auth/reset-password/${existedUser._id}/${token.token}`;
    const htmlMessage = `<h3>Click this link to reset your password ${link}.</h3>`;
    const mailOptions = {
      to: email,
      subject: "Reset password successfully!",
      html: htmlMessage,
    };
    await sendMail(mailOptions);

    return response.status(200).send({
      email,
      resetPassword: randomPassword,
      message: "Link password reset just sent to your email box. Please check it out."
    });
  } catch (error) {
    console.log("ResetPasswordError: ", error);
    return response.status(400).send({
      message: "Reset password failure",
    });
  }
};

exports.confirmResetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(403).send("User not found!");
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired!");
    const hashPassword = await hashUserPassword(password);
    user.password = hashPassword;
    await user.save();
    await token.delete();

    return res.status(200).send("password reset successfully.");
  } catch (error) {
    console.log("ResetPasswordError: ", error);
    return res.status(400).send({
      message: "Reset password failure",
    });
  }
};
