const { User, Stock } = require('../models');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

module.exports = {
// Get all accounts
  getAccounts(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
// Get an account
  getSingleAccount(req, res) {
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
  // Create account
  createAccount(req,res) {

    // example
    // const token = jwt.sign({ user }, process.env.JWT_SECRET)

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
},
// Verify token
verifyToken(req,res){

  // example
  // const decodedToken = jwt.verify(token, 'tacocat')

  const token = req.headers.authorization?.split(" ")[1];
  try {
      const data = jwt.verify(token,process.env.JWT_SECRET)
      User.findByPk(data.userId,{
          include:[Stock]
      }).then(foundUser=>{
          res.json(foundUser)
      })
  } catch (err) {
      console.log(err);
      res.status(403).json({msg:"bad token",err})
  }
}
}