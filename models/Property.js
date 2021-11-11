const { model, Schema } = require("mongoose");
const porpertySchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("property", porpertySchema);
