const { User, Stock } = require('../models');
const jwt = require("jsonwebtoken")

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
  getUserByUsername(req, res) {
    console.log(req.params.userName)
    User.findOne({ username: req.params.userName})
    .populate('stocks')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that username' })
          : res.json(user)
      )
      .catch((err) =>{
        console.log(err)
        res.status(500).json(err);
      }) 
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
  
// Update a bio
  updateBio(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId })
    .then((user) =>{
        if (!user){
           return res.status(404).json({ message: 'No such user with that id' })
        }
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
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
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { stocks: req.params.stockId } },
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
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete a stock
  deleteStock(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: {stocks:{$in:req.params.stockId}}},
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create account
  createAccount(req,res) {
    User.create({
        username:req.body.username,
        password:req.body.password
    }).then(newser=>{
        const token = jwt.sign({
            username:newser.username,
            userId:newser.id
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            user:newser
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"womp womp",
            err
        })
    })
},
// login
login(req,res) {
  console.log('req.body: ',req.body)
  User.findOne({
      where:{
      username:req.body.username
  }}).then(foundUser=>{
      console.log(foundUser)
      if(!foundUser){
          return res.status(401).json({msg:"invalid login"})
      }else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
          return res.status(401).json({msg:"invalid login"})
      } else{
          const token = jwt.sign({
              username:foundUser.username,
              userId:foundUser.id
          },process.env.JWT_SECRET,{
              expiresIn:"2h"
          })
          res.json({
              token,
              user:foundUser
          })
      }
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
          msg:"womp womp",
          err
      })
  })
}
}
