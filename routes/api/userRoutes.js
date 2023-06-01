const router = require("express").Router();
const {
  getAccounts,
  getSingleAccount,
  createAccount,
  deleteAccount,
  addStock,
  // deleteFriend,
  updateStock,
  deleteStock,
  login,
  verifyToken,
  createAccount,
  getUserByUsername,
} = require("../../controllers/userController.js");

// /api/users
router.route("/")
.get(getAccounts)
.post(createAccount);

// /api/login
router.route("/login")
.post(login);


// /api/users/:userId
router.route("/:userId")
.get(getSingleAccount)
.delete(deleteAccount);

router.route("/username/:userName")
.get(getUserByUsername)

// /api/users/:userId/stocks/:stockId
router.route("/:userId/stock/:stockId")
.post(addStock)
.delete(deleteStock)
.put(updateStock);


module.exports = router;