const { User, Stock } = require('../models');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
// Get all accounts
  getAccounts(req, res) {
    User.find()
    .populate('stocks')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
// Get an account
  getSingleAccount(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate('stocks')
    .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  getUserByUsername(req, res) {
    User.findOne({ username: req.params.userName})
    .populate("stocks")
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
    User.findOneAndUpdate({ username: req.params.userName},req.body,{new:true})
    .then((user) =>{
        if (!user){
           return res.status(404).json({ message: 'No such user with that id' })
        }
        res.status(200).json(user)
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateProfilePic(req, res) {
    User.findOneAndUpdate({ username: req.params.userName },{profile_pic:req.body.profile_pic},{new:true})
    .then((user) =>{
        if (!user){
           return res.status(404).json({ message: 'No such user with that id' })
        }
        res.status(200).json(user)
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

// Delete an account
  deleteAccount(req, res) {
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
    User.create(
        req.body
    ).then(newser=>{
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
  User.findOne({username:req.body.username})
  .then(foundUser=>{
      console.log(foundUser)
      if(!foundUser){
          return res.status(401).json({msg:"invalid login"})
      }else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
          return res.status(401).json({msg:"invalid login"})
      } else{
          const token = jwt.sign({
              username:foundUser.username,
              userId:foundUser._id
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
},
// Verify token
verifyToken(req,res){
  // console.log(req.headers)
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(req.headers.authorization.split(" ")[1])
  console.log(token)
  try {
    const data = jwt.verify(token,process.env.JWT_SECRET)
    console.log(data)
    User.findOne({ username: data.username})
    .populate('stocks')
      .then(user =>{
        console.log(user)
        res.status(200).json(user)
      })
}catch (err){
  console.log(err)
  res.status(403).json({msg:"bad token",err})

}
}
}