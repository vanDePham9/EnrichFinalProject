const mongoose = require("mongoose");
const Cart = mongoose.model("cart");
const product = mongoose.model("product");
const getUserId = require("../utils/getUserId");
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
 * @apiBody {String} productId The product id can find by [GetAllProduct](#api-Product-GetProduct) APIs.
 * @apiBody {String} name The product name.
 * @apiBody {Number} quantity The product quantity.
 * @apiBody {Number} price The product price.
 * @apiBody {Number} cartId The cart id.
 *
 * @apiParamExample {json} Input
 *    {
 *         "productId": "635759d964d1782aabae4b36",
 *         "price": 1000,
 *         "quantity": 2,
 *         "name": "snack",
 *         "cartId": "876182368176283761"
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
 *         "_id": "636230567b686f681bda20ae",
 *         "userId": "635fd669a53868845f306068",
 *         "carts": [
 *             {
 *                 "cartId": "635f9da710e3ff0b2a9052f6",
 *                 "products": [
 *                     {
 *                         "productId": "635f9da710e3ff0b2a9052f2",
 *                         "quantity": 10,
 *                         "name": "bicycle",
 *                         "price": 2000,
 *                         "_id": "636230567b686f681bda20b0"
 *                     },
 *                     {
 *                         "productId": "635f9db810e3ff0b2a9052f5",
 *                         "quantity": 8,
 *                         "name": "boat",
 *                         "price": 12000,
 *                         "_id": "636234f46c4d6a2d8b94a5bd"
 *                     }
 *                 ],
 *                 "_id": "636230567b686f681bda20af"
 *             },
 *             {
 *                 "cartId": "876182368176283761",
 *                 "products": [
 *                     {
 *                         "productId": "635f9db810e3ff0b2a9052f5",
 *                         "quantity": 8,
 *                         "name": "boat",
 *                         "price": 12000,
 *                         "_id": "63623521774c1dd9c4c10d1d"
 *                     },
 *                     {
 *                         "productId": "635f9d8910e3ff0b2a9052ef",
 *                         "quantity": 10,
 *                         "name": "cruise",
 *                         "price": 20000,
 *                         "_id": "63623570774c1dd9c4c10d27"
 *                     }
 *                 ],
 *                 "_id": "63623521774c1dd9c4c10d1c"
 *             }
 *         ],
 *         "active": true,
 *         "modifiedOn": "2022-11-02T08:54:46.693Z",
 *         "__v": 3
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
  Cart.find({}, (err, carts) => {
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
const validate = (product, condition) => {
  const { name, price } = condition;
  if (name !== product.name || price !== product.price) {
    return true;
  }
  return false;
};
exports.create_a_cart = async (req, res) => {
  const { productId, quantity, name, price, cartId } = req.body;
  const token = req.header("Authorization");
  const userId = getUserId(token);
  try {
    const exitedProduct = await product.findById(productId);
    console.log("exitedProduct = ", exitedProduct);
    if (!exitedProduct) {
      return res.status(400).send("product not found!");
    }
    const validateProduct = validate(exitedProduct, { name, price });
    if (validateProduct) {
      return res.status(400).send("name or price not match!");
    }
    let cart = await Cart.findOne({ userId });
    if (cart) {
      //cart exists for user
      let itemIndex = cart.carts.findIndex((c) => c.cartId == cartId);
      if (itemIndex > -1) {
        //carts exists in the cart, update the product
        let cartItem = cart.carts[itemIndex];
        let productIndex = cartItem.products.findIndex(
          (p) => p.productId == productId
        );
        if (productIndex > -1) {
          let productItem = cartItem.products[productIndex];
          productItem.quantity = quantity;
          cartItem.products[productIndex] = productItem;
        } else {
          cartItem.products.push({ productId, quantity, name, price });
        }
      } else {
        //carts does not exists in cart, add new item
        cart.carts.push({
          cartId,
          products: [{ productId, quantity, name, price }],
        });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        carts: [
          {
            cartId,
            products: [{ productId, quantity, name, price }],
          },
        ],
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong when add product to cart.");
  }
};