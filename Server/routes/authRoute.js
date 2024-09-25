const router = require('express').Router();
const multer = require("multer");
const { verifyJWT } = require("../utils/verifyJWT");
const { verifyOwnership } = require("../utils/verifyOwnership");
const upload = multer();
const User = require("../models/user");

const {
    registerController,
    loginController,
    userEditController,
    recoveryRequestController,
    validateRecoveryTokenController,
    resetPasswordController,
    getAllUsersController,
    deleteUserController,
  } = require("../controllers/authController");

  //Auth routes
router.post("/register", upload.single("profileImage"), registerController);
router.post("/login", loginController);
router.put(
  "/user/:userId",
  upload.single("profileImage"),
  verifyJWT,
  userEditController
);
router.get(
  "/users",
  verifyJWT,
  getAllUsersController
);
router.delete(
  "/user/:userId",
  verifyJWT,
  verifyOwnership(User, "userId"),
  deleteUserController
);

//Recovery routes
router.post("/recovery/request", recoveryRequestController);
router.post("/recovery/validate", validateRecoveryTokenController);
router.post("/recovery/reset/", resetPasswordController);

module.exports = router;

module.exports = router;