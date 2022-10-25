const mongoose = require("mongoose");
const product = mongoose.model("product");

/**
 * @api {get} /product?order=:order&sort=:sort&page=:page&limit=:limit Get All Product
 * @apiVersion 0.1.0
 * @apiName GetProduct
 * @apiGroup Product
 * @apiPermission productManager
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 * 
 * @apiParam {string} [order] The date field product to sort in product object. Default: `createdAt`.
 * @apiParam {string} [sort] A sort type of order field (`ASC` or `DESC`). Default: `DESC`.
 * @apiParam {string} [page] The current page of product report. The product page start from 0. Default: 0.
 * @apiParam {string} [size] The limit number product to retrieve the product records responses per page.
 *
 * @apiSuccess {String} _id Id of the product.
 * @apiSuccess {String} name  The product name.
 * @apiSuccess {String} price  The product price.
 * @apiSuccess {String} createdDate  The date time when product was created.
 * @apiSuccess {String} updateDate  The date time when product was updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "_id": "6357a82269b80b5629d1b3bf",
 *             "name": "car",
 *             "price": 10000,
 *             "createdDate": "2022-10-25T09:10:58.989Z",
 *             "updatedDate": "2022-10-25T09:10:58.989Z",
 *             "__v": 0
 *         },
 *         {
 *             "_id": "635759ea64d1782aabae4b39",
 *             "name": "tomato",
 *             "price": 2000,
 *             "createdDate": "2022-10-25T03:37:14.919Z",
 *             "updatedDate": "2022-10-25T03:37:14.919Z",
 *             "__v": 0
 *         },
 *         {
 *             "_id": "635759d964d1782aabae4b36",
 *             "name": "snack",
 *             "price": 1000,
 *             "createdDate": "2022-10-25T03:36:57.144Z",
 *             "updatedDate": "2022-10-25T03:36:57.144Z",
 *             "__v": 0
 *         }
 *     ]
 *
 *
 * @apiUse ProductError
 *
 */

/**
 * @api {get} /product/:id Get a product
 * @apiVersion 0.1.0
 * @apiName GetTheProduct
 * @apiGroup Product
 * @apiPermission productManager
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 *
 * @apiParam {Number} id Product unique ID.
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
 *       "_id": "6357a82269b80b5629d1b3bf",
 *       "name": "car",
 *       "price": 10000,
 *       "createdDate": "2022-10-25T09:10:58.989Z",
 *       "updatedDate": "2022-10-25T09:10:58.989Z",
 *     }
 *
 *
 * @apiUse ProductError
 *
 */

/**
 * @api {post} /product Create a Product
 * @apiVersion 0.1.0
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission productManager
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 *
 * @apiBody {String} name The product name.
 * @apiBody {Number} price The product price.
 *
 * @apiParamExample {json} Input
 *    {
 *       "name": "pen",
 *       "price": 1000
 *    }
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
 *       "_id": "6357a82269b80b5629d1b3bf",
 *       "name": "pen",
 *       "price": 1000,
 *       "createdDate": "2022-10-25T09:10:58.989Z",
 *       "updatedDate": "2022-10-25T09:10:58.989Z",
 *     }
 *
 *
 * @apiUse ProductError
 *
 */

/**
 * @api {put} /product/:id Update a Product
 * @apiVersion 0.1.0
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission productManager
 * @apiPermission admin
 *
 * @apiUse AuthorizationToken
 *
 * @apiParam {Number} id Product unique ID.
 * 
 * @apiParamExample {json} Input
 *    {
 *       "name": "tomato",
 *       "price": 2000
 *    }
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
 *       "_id": "6357a82269b80b5629d1b3bf",
 *       "name": "tomato",
 *       "price": 2000,
 *       "createdDate": "2022-10-25T09:10:58.989Z",
 *       "updatedDate": "2022-10-25T09:11:58.989Z",
 *     }
 *
 *
 * @apiUse ProductError
 *
 */

/**
 * @api {delete} /product/:id Delete a Product
 * @apiVersion 0.1.0
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission productManager
 * @apiPermission admin
 * 
 * @apiUse AuthorizationToken
 *
 * @apiParam {Number} id Product unique ID.
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
 *       "_id": "6357a82269b80b5629d1b3bf",
 *       "name": "tomato",
 *       "price": 2000,
 *       "createdDate": "2022-10-25T09:10:58.989Z",
 *       "updatedDate": "2022-10-25T09:11:58.989Z",
 *     }
 *
 *
 * @apiUse ProductError
 *
 */
exports.list_all_products = (req, res) => {
  const {
    limit = 10,
    page = 0,
    order = "createdDate",
    sort = "desc",
  } = req.query;
  product
    .find({}, (err, products) => {
      if (err) return res.send(err);
      return res.json(products);
    })
    .sort({ [order]: sort })
    .limit(limit)
    .skip(limit * page);
};

exports.create_a_product = (req, res) => {
  const newproduct = new product(req.body);
  newproduct.save((err, product) => {
    if (err) return res.send(err);
    return res.json(product);
  });
};

exports.read_a_product = (req, res) => {
  product.findById(req.params.productId, (err, product) => {
    if (err) return res.send(err);
    return res.json(product);
  });
};

exports.update_a_product = (req, res) => {
  const nowDate = new Date().toISOString();
  req.body.updatedDate = nowDate;
  product.findOneAndUpdate(
    { _id: req.params.productId },
    req.body,
    { new: true },
    (err, product) => {
      if (err) return res.send(err);
      return res.json(product);
    }
  );
};

exports.delete_a_product = (req, res) => {
  product.deleteOne({ _id: req.params.productId }, (err) => {
    if (err) return res.send(err);
    return res.json({
      message: "product successfully deleted",
      _id: req.params.productId,
    });
  });
};
