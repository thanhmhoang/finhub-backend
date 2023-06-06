const { ObjectId } = require('mongoose').Types;
const { User, Stock } = require('../models');

module.exports = {
// Get all stocks
  getStocks(req, res) {
    Stock.find()
      .then((stocks) => res.json(stocks))
      .catch((err) => res.status(500).json(err));
  },
// Get a single stock
   getSingleStock(req, res) {
    Stock.findOne({ _id: req.params.stockId })
      .select('-__v')
      .then((stock) =>
        !stock
          ? res.status(404).json({ message: 'No stock with that ID' })
          : res.json(stock)
      )
      .catch((err) => res.status(500).json(err));
  },

   getStockTicker(req, res) {
    Stock.findOne({ ticker: req.params.tickerName })
      .select('-__v')
      .then((stock) =>
        !stock
          ? res.status(404).json({ message: 'No stock with that ID' })
          : res.json(stock)
      )
      .catch((err) => res.status(500).json(err));
  },

  createStock(req, res) {
    Stock.create(req.body)
      .then((stock) => res.json(stock))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  updateStock(req, res) {
    Stock.findOneAndUpdate({ ticker: req.params.tickerName},req.body,{new:true})
    .then((stock) =>{
        if (!stock){
           return res.status(404).json({ message: 'No such stock with that id' })
        }
        res.status(200).json(stock)
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
}