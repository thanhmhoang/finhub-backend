const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addStock,
  // deleteFriend,
  updateStock,
  deleteStock,
  createAccount,
  login
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/account
router.route("/account").post(createAccount);

// /api/login
router.route("/login").post(login);


// /api/users/:userId
router.route("/:userId")
.get(getSingleUser)
.delete(deleteUser);

// /api/users/:userId/stocks/:stockId
router.route("/:userId/stock/:stockId")
.post(addStock)
.delete(deleteStock)
.post(updateStock);


module.exports = router;