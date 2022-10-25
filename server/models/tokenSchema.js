const mongoose = require("mongoose");

const { Schema } = mongoose;

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    token: {
      type: String,
      required: true,
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
  { collection: "token" }
);

module.exports = mongoose.model("token", tokenSchema);
