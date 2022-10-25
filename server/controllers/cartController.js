const mongoose = require("mongoose");
const Cart = mongoose.model("cart");
const getUserId = require('../utils/getUserId');

/**
 * @api {get} /cart/all?order=:order&sort=:sort&page=:page&limit=:limit Get All Cart
 * @apiVersion 0.1.0
 * @apiName GetCart
 * @apiGroup Cart
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 * 
 * @apiParam {string} [order] The date field cart to sort in cart object. Default: `createdAt`.
 * @apiParam {string} [sort] A sort type of order field (`ASC` or `DESC`). Default: `DESC`.
 * @apiParam {string} [page] The current page of cart report. The cart page start from 0. Default: 0.
 * @apiParam {string} [size] The limit number cart to retrieve the cart records responses per page.
 *
 * @apiSuccess {String} _id Id of the cart.
 * @apiSuccess {String} userId  The userId of cart.
 * @apiSuccess {String} products  The products cart.
 * @apiSuccess {String} active  The status of cart.
 * @apiSuccess {String} modifiedOn  The date time when cart was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "635901162bd553603c104731",
 *         "userId": "6357a477d8509ce1b28c4fa2",
 *         "products": [
 *             {
 *                 "productId": "635759d964d1782aabae4b36",
 *                 "quantity": 2,
 *                 "name": "snack",
 *                 "price": 1000,
 *                 "_id": "635901162bd553603c104732"
 *             }
 *         ],
 *         "active": true,
 *         "modifiedOn": "2022-10-26T09:42:46.929Z",
 *         "__v": 0
 *     }
 *
 *
 * @apiUse CartError
 *
 */

/**
 * @api {get} /cart Get user cart
 * @apiVersion 0.1.0
 * @apiName GetUserCart
 * @apiGroup Cart
 * @apiPermission application
 * 
 * @apiUse AuthorizationToken
 *
 * @apiSuccess {String} _id Id of the cart.
 * @apiSuccess {String} userId  The userId of cart.
 * @apiSuccess {String} products  The products cart.
 * @apiSuccess {String} active  The status of cart.
 * @apiSuccess {String} modifiedOn  The date time when cart was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "635901162bd553603c104731",
 *         "userId": "6357a477d8509ce1b28c4fa2",
 *         "products": [
 *             {
 *                 "productId": "635759d964d1782aabae4b36",
 *                 "quantity": 2,
 *                 "name": "snack",
 *                 "price": 1000,
 *                 "_id": "635901162bd553603c104732"
 *             }
 *         ],
 *         "active": true,
 *         "modifiedOn": "2022-10-26T09:42:46.929Z",
 *         "__v": 0
 *     }
 *
 *
 * @apiUse CartError
 *
 */

/**
 * @api {post} /product Create/Update a cart
 * @apiVersion 0.1.0
 * @apiName CreateUpdateCart
 * @apiGroup Cart
 * @apiPermission application
 * 
 * @apiUse AuthorizationToken
 *
 * @apiBody {String} productId The product id name.
 * @apiBody {String} name The product name.
 * @apiBody {Number} quantity The product quantity.
 * @apiBody {Number} price The product price.
 *
 * @apiParamExample {json} Input
 *    {
 *         "productId": "635759d964d1782aabae4b36",
 *         "price": 1000,
 *         "quantity": 2,
 *         "name": "snack"
 *     }
 *
 * @apiSuccess {String} _id Id of the product.
 * @apiSuccess {String} name  The product name.
 * @apiSuccess {String} price  The product price.
 * @apiSuccess {String} createdDate  The date time when product was created.
 * @apiSuccess {String} updateDate  The date time when product was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "userId": "6357a477d8509ce1b28c4fa2",
 *         "products": [
 *             {
 *                 "productId": "635759d964d1782aabae4b36",
 *                 "quantity": 2,
 *                 "name": "snack",
 *                 "price": 1000,
 *                 "_id": "635901162bd553603c104732"
 *             }
 *         ],
 *         "active": true,
 *         "_id": "635901162bd553603c104731",
 *         "modifiedOn": "2022-10-26T09:42:46.929Z",
 *         "__v": 0
 *     }
 *
 *
 * @apiUse CartError
 *
 */

/**
 * @api {delete} /cart/:id Delete a Cart
 * @apiVersion 0.1.0
 * @apiName DeleteCart
 * @apiGroup Cart
 * @apiPermission admin
 * @apiPermission application
 * 
 * @apiUse AuthorizationToken
 *
 * @apiParam {Number} id Cart unique ID.
 *
 * @apiSuccess {String} _id Id of the product.
 * @apiSuccess {String} name  The product name.
 * @apiSuccess {String} price  The product price.
 * @apiSuccess {String} createdDate  The date time when product was created.
 * @apiSuccess {String} updateDate  The date time when product was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "6358fb5366b3b883384d3321",
 *       "message": "cart successfully deleted"
 *     }
 *
 *
 * @apiUse CartError
 *
 */

// Admin role
 exports.list_all_carts = (req, res) => {
  const {
    limit = 10,
    page = 0,
    order = "createdDate",
    sort = "desc",
  } = req.query;
  Cart
    .find({}, (err, carts) => {
      if (err) return res.send(err);
      return res.json(carts);
    })
    .sort({ [order]: sort })
    .limit(limit)
    .skip(limit * page);
};
exports.delete_a_cart = async (req, res) => {
  Cart.deleteOne({ _id: req.params.cartId }, (err) => {
    if (err) return res.send(err);
    return res.json({
      message: "cart successfully deleted",
      _id: req.params.cartId,
    });
  });
};

// Regular User role
exports.list_a_carts = async (req, res) => {
  const token = req.header("Authorization");
  const userId = getUserId(token);
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      return res.status(201).send(cart);
    } else {
      res.status(400).send("Cart not found.");
    }
  } catch (error) {
    console.log(err);
    res.status(500).send("Something went wrong when get cart.");
  }
};
exports.create_a_cart = async (req, res) => {
  const { productId, quantity, name, price } = req.body;
  const token = req.header("Authorization");
  const userId = getUserId(token);

  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, name, price }]
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong when add product to cart.");
  }
};
