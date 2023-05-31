const { Schema, model } = require("mongoose");

const stockSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
      unique:true,
    },
    tickerId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
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