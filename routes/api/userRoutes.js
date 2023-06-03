const router = require("express").Router();
const {
  getAccounts,
  getSingleAccount,
  createAccount,
  deleteAccount,
  addStock,
  updateStock,
  deleteStock,
  login,
  verifyToken,
  getUserByUsername,
  updateProfilePic,
  updateBio
} = require("../../controllers/userController.js");


router.route("/verifytoken").get(verifyToken)
router.route("/login").post(login);
// /api/users
router.route("/")
.get(getAccounts)
.post(createAccount)


// /api/login


// /api/users/:userId
router.route("/:userId")
.get(getSingleAccount)
.delete(deleteAccount);

router.route("/username/:userName")
.get(getUserByUsername)

router.route("/profilepic/:userName").put(updateProfilePic)
router.route("/bio/:userName").put(updateBio)

// /api/users/:userId/stocks/:stockId
router.route("/:userId/stock/:stockId")
.post(addStock)
.delete(deleteStock)
.put(updateStock);


module.exports = router;