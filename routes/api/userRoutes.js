const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addStock,
  deleteFriend,
} = require("../../controllers/userController.js");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:UserId").get(getSingleUser).delete(deleteUser);

// /api/users/:userId/stocks/:stockId
router.route("/:userId/stock/:stockId").post(addStock).delete(deleteFriend);

module.exports = router;