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
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:UserId")
.get(getSingleUser)
.delete(deleteUser);

// /api/users/:userId/stocks/:stockId
router.route("/:userId/stock/:stockId")
.post(addStock)
.delete(deleteStock)
.post(updateStock);


module.exports = router;