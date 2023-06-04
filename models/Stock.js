const { Schema, model,Types } = require("mongoose");

const stockSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
      unique: true
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Stock = model('Stock', stockSchema);

module.exports = Stock;