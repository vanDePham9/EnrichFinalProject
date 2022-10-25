const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidator } = require("../validations/auth");

/**
 * @api {get} /user?order=:order&sort=:sort&page=:page&limit=:limit Get All User
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 * 
 * @apiParam {string} [order] The date field used to sort in user object. Default: `createdAt`.
 * @apiParam {string} [sort] A sort type of order field (`ASC` or `DESC`). Default: `DESC`.
 * @apiParam {string} [page] The current page of user report. The user page start from 0. Default: 0.
 * @apiParam {string} [size] The limit number used to retrieve the user records responses per page.
 *
 * @apiSuccess {String} _id Id of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} password  Hash password of the User.
 * @apiSuccess {String} role  Role of the User.
 * @apiSuccess {String} createdDate  The date time when user was created.
 * @apiSuccess {String} updateDate  The date time when user was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "_id": "6357a477d8509ce1b28c4fa2",
 *             "email": "depvadmin@getnada.com",
 *             "password": "$2a$10$IlHBjkvRW.VBR6W53drm2.zoO0g2KR5GDSdg.3oo6UQEqUJpqbH0e",
 *             "role": "admin",
 *             "createdDate": "2022-10-25T08:55:19.788Z",
 *             "updatedDate": "2022-10-25T08:55:19.789Z",
 *             "__v": 0
 *         },
 *         {
 *             "_id": "6358b6de5f69543813ad6239",
 *             "email": "regular1@inboxbear.com",
 *             "password": "$2a$10$jdZAOAiv2qmFFtoUljY8UeJxInBmDSs2ZspQU2MGIar3bLIKOdwPy",
 *             "role": "regularUser",
 *             "createdDate": "2022-10-26T04:26:06.745Z",
 *             "updatedDate": "2022-10-26T04:26:06.745Z",
 *             "__v": 0
 *         }
 *     ]
 *
 *
 * @apiUse SystemErrors
 *
 */

/**
 * @api {get} /user/:id Get a User
 * @apiVersion 0.1.0
 * @apiName GetTheUser
 * @apiGroup User
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} _id Id of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} password  Hash password of the User.
 * @apiSuccess {String} role  Role of the User.
 * @apiSuccess {String} createdDate  The date time when user was created.
 * @apiSuccess {String} updateDate  The date time when user was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "6357a477d8509ce1b22222",
 *       "email": "success@getnada.com"
 *       "password": "$2a$10$IlHBjkvRW.VBR6W53drm2.zoO0g2KR5GDSdg.3oo6UQEqUJpqbH0e"
 *       "role": "admin"
 *       "createdDate": "2022-10-25T08:55:19.788Z"
 *       "updateDate": "2022-10-25T08:55:19.788Z"
 *     }
 *
 *
 * @apiUse SystemErrors
 *
 */

/**
 * @api {post} /user Create a User
 * @apiVersion 0.1.0
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 *
 * @apiBody {String} email Email of user need to insert.
 * @apiBody {String} password Password of user need to insert.
 *
 * @apiParamExample {json} Input
 *    {
 *       "email": "regular1@inboxbear.com",
 *       "password": "Matkhau@123"
 *    }
 *
 * @apiSuccess {String} _id Id of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} password  Hash password of the User.
 * @apiSuccess {String} role  Role of the User.
 * @apiSuccess {String} createdDate  The date time when user was created.
 * @apiSuccess {String} updateDate  The date time when user was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "6357a477d8509ce1b22222",
 *       "email": "success@getnada.com"
 *       "password": "$2a$10$IlHBjkvRW.VBR6W53drm2.zoO0g2KR5GDSdg.3oo6UQEqUJpqbH0e"
 *       "role": "admin"
 *       "createdDate": "2022-10-25T08:55:19.788Z"
 *       "updateDate": "2022-10-25T08:55:19.788Z"
 *     }
 *
 *
 * @apiUse SystemErrors
 *
 */

/**
 * @api {put} /user/:id Update a User
 * @apiVersion 0.1.0
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} _id Id of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} password  Hash password of the User.
 * @apiSuccess {String} role  Role of the User.
 * @apiSuccess {String} createdDate  The date time when user was created.
 * @apiSuccess {String} updateDate  The date time when user was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "6357a477d8509ce1b22222",
 *       "email": "success@getnada.com"
 *       "password": "$2a$10$IlHBjkvRW.VBR6W53drm2.zoO0g2KR5GDSdg.3oo6UQEqUJpqbH0e"
 *       "role": "admin"
 *       "createdDate": "2022-10-25T08:55:19.788Z"
 *       "updateDate": "2022-10-25T08:55:19.788Z"
 *     }
 *
 *
 * @apiUse SystemErrors
 *
 */

/**
 * @api {delete} /user/:id Delete a User
 * @apiVersion 0.1.0
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} _id Id of the User.
 * @apiSuccess {String} email  Email of the User.
 * @apiSuccess {String} password  Hash password of the User.
 * @apiSuccess {String} role  Role of the User.
 * @apiSuccess {String} createdDate  The date time when user was created.
 * @apiSuccess {String} updateDate  The date time when user was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "6357a477d8509ce1b22222",
 *       "email": "success@getnada.com"
 *       "password": "$2a$10$IlHBjkvRW.VBR6W53drm2.zoO0g2KR5GDSdg.3oo6UQEqUJpqbH0e"
 *       "role": "admin"
 *       "createdDate": "2022-10-25T08:55:19.788Z"
 *       "updateDate": "2022-10-25T08:55:19.788Z"
 *     }
 *
 *
 * @apiUse SystemErrors
 *
 */
exports.list_all_Users = (req, res) => {
  const {
    limit = 10,
    page = 0,
    order = "createdDate",
    sort = "desc",
  } = req.query;
  User.find({}, (err, Users) => {
    if (err) return res.send(err);
    return res.json(Users);
  })
    .sort({ [order]: sort })
    .limit(limit)
    .skip(limit * page);
};
exports.create_a_Users = async (request, response) => {
  try {
    const { error } = registerValidator(request.body);
    const { email, password, role } = request.body;

    if (error) return response.status(422).send(error.details[0].message);
    if (role === "admin") {
      return response.status(400).send({
        message: "You have not permission to create a Admin's account.",
      });
    }

    const checkEmailExist = await User.findOne({ email });

    if (checkEmailExist) return response.status(422).send("Email is exist");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashPassword,
      role,
    });
    const newUser = await user.save();
    return response.send(newUser);
  } catch (error) {
    console.log('createUserError:', error)
    return response.status(400).send(error);
  }
};
exports.read_a_User = (req, res) => {
  User.findById(req.params.UserId, (err, User) => {
    if (err) return res.send(err);
    return res.json(User);
  });
};

exports.update_a_User = (req, res) => {
  const nowDate = new Date().toISOString();
  req.body.updatedDate = nowDate;
  User.findOneAndUpdate(
    { _id: req.params.UserId },
    req.body,
    { new: true },
    (err, User) => {
      if (err) return res.send(err);
      return res.json(User);
    }
  );
};

exports.delete_a_User = (req, res) => {
  User.deleteOne({ _id: req.params.UserId }, (err) => {
    if (err) return res.send(err);
    return res.json({
      message: "User successfully deleted",
      _id: req.params.UserId,
    });
  });
};
