const { uServer } = require('engine.io');
const { User, Stock } = require('../models');

module.exports = {
// Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
// Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
// Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
// Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Stock.deleteMany({ _id: { $in: user.stocks } })
      )
      .then(() => res.json({ message: "User and user's watch list has been deleted!" }))
      .catch((err) => res.status(500).json(err));
  },

// Add a Stock
  addStock(req, res) {
    Stock.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { stock: req.params.stockId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
// Delete a friend  
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No User found with this ID!" })
            : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a stock
  updateStock(req, res) {
    Stock.findOneAndUpdate(
        { _id: req.params.userId },
        {$set: req.body.stockId},
        {runValidators:true, new:true}
        )
      .then((user) =>{
        if (!user){
           return res.status(404).json({ message: 'No such user with that id' })
        }
        res.json(uServer)
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete a stock
  deleteStock(req, res) {
    Stock.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: {reactions:{stockId:req.params.stockId}} },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};