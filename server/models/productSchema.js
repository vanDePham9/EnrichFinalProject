const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: 'name cannot be blank'
    },
    price: {
      type: Number,
      required: true
    },
    createdDate: {
      type: Date,
      default: Date.now
    },
    updatedDate: {
      type: Date,
      default: Date.now
    },
  },
  { collection: 'product' }
);

module.exports = mongoose.model('product', productSchema);