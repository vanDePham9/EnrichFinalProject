/**
 * @apiDefine admin Admin with all API's access
 * This permission reserved for an advanced security model.
 */

/**
 * @apiDefine productManager ProductManager with product's access only
 * This permission reserved for an advanced security model.
 */

/**
 * @apiDefine application Regular User of application. 
 * This permission reserved for an advanced security model.
 */

/**
 * @apiDefine SystemErrors
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Not Found
 *     {
 *       "error": "Validation"
 *     }
 */

/**
 * @apiDefine ProductError
 *
 * @apiError ProductError The id of the Product was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "ProductNotFound"
 *     }
 */

/**
 * @apiDefine CartError
 *
 * @apiError CartError The id of the Cart was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CartNotFound"
 *     }
 */

/**
 * @apiDefine AuthError
 *
 * @apiError AuthError The id of the Auth was not found.
 *
 * @apiErrorExample Validation:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "Email or Password is not correct"
 *     }
 */

/**
 * @apiDefine AuthorizationToken
 * @apiHeader {string} Authorization Authorization token returned from [Register](#api-Authentication-Register) and [Login](#api-Authentication-Login) API.
 */

/**
 *
 * @api {OBJECT} NewUser 1 - NewUser
 * @apiSampleRequest off
 * @apiGroup Types
 * @apiVersion 0.1.0
 * @apiBody {string} email The email user.
 * @apiBody {string} password The password hashed from input password.
 * @apiBody {string} role The role of user (`admin` or `productManager` or `regularUser`). Default: `regularUser`.
 * @apiBody {string} _id The id of user.
 * @apiBody {string} createdDate The date time when user created.
 * @apiBody {string} updatedDate The date time when user updated.
 *
 */


/**
 *
 * @api {OBJECT} ShortUser 2 - Short User Info
 * @apiSampleRequest off
 * @apiGroup Types
 * @apiVersion 0.1.0
 * @apiBody {string} email The email user.
 * @apiBody {string} role The role of user (`admin` or `productManager` or `regularUser`). Default: `regularUser`.
 * @apiBody {string} _id The id of user.
 *
 */