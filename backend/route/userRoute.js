const {
  userSignup,
  userSignin,
  userAuthMe,
  logOut,
} = require("../controler/userController");
const { userAuth } = require("../auth/userAuth");
const userRouter = require("express").Router();

userRouter.route("/user_create").post(userSignup);
userRouter.route("/user_signin").post(userSignin);
userRouter.route("/me").get(userAuth, userAuthMe);
userRouter.route("/logout").get(logOut);

module.exports = userRouter;
