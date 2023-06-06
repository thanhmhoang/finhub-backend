const { Schema, model,Types } = require("mongoose");

const stockSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: String,
      default:''
    },
    high: {
      type: String,
      default:''
    },
    low: {
      type: String,
      default:''
    },
    open: {
      type: String,
      default:''
    },
    day_change: {
      type: String,
      default:''
    },
    volume: {
      type: String,
      default:''
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