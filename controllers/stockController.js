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
// Add a stock
  addStock(req, res) {
    Stock.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { stocks: _id } },
          { new: true }
        );
      })
      .then((stock) =>
        !stock
          ? res.status(404).json({ message: "No User found with this ID!" })
          : res.json(stock)
      )
      .catch((err) => res.status(500).json(err));
  },
// Update a stock
  updateStock(req, res) {
    Stock.findOneAndUpdate(
      { _id: req.params.stockId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((stock) =>
        !stock
          ? res.status(404).json({ message: 'No stock with this id!' })
          : res.json(stock)
      )
      .catch((err) => res.status(500).json(err));
  },
//   Delete a stock
  deleteStock(req, res) {
    Thought.findOneAndDelete({ _id: req.params.stockId })
      .then((stock) =>
        !stock
          ? res.status(404).json({ message: "No stock found with this ID!" })
          : User.findOneAndUpdate(
              { stocks: req.params.stockId },
              { $pull: { thoughts: req.params.stockId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Stock deleted, but no user found'})
          : res.json({ message: 'Stock successfully deleted' })
      )
      .catch((err) => res.status(500).json(err));
  },
};