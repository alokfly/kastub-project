const { model, Schema } = require("mongoose");
const userSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phonno: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    successCode: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = model("user", userSchema);
