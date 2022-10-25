require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const productModel = require("./server/models/productSchema");
const cartModel = require("./server/models/cartSchema");
const productRoute = require("./server/routes/productRoute");
const cartRoute = require("./server/routes/cartRoute");
const authRoute = require("./server/routes/authRoute");
const userRoute = require("./server/routes/userRoute");
const indexRouter = require("./server/routes/index");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
const port = 3000;
const { MONGODB_HOST } = process.env

// set up mongoose
mongoose
  .connect(MONGODB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

// set up routes
app.use("/", indexRouter);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
