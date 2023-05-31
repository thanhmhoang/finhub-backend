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
  }
}