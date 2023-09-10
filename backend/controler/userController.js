const userModel = require("../model/userModel");
const generateToken = require("../utility/tokenGenertorFunc");

exports.userSignup = async (req, res) => {
  try {
    const data = await userModel.create(req.body);
    generateToken(data, 201, res, "account created");
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.userSignin = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(201).json({
        message: "something went wrong",
      });
    }
    const data = await userModel
      .findOne({ email: req.body.email })
      .select("+password");
    if (!data) {
      return res.status(201).json({
        message: "account not found",
      });
    }
    if (req.body.password !== data.password) {
      return res.status(201).json({
        message: "account not found",
      });
    }
    generateToken(data, 201, res, "user logged in");
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.userAuthMe = async (req, res) => {
  try {
    res.status(201).json({
      _id: req.userAllData.id,
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.logOut = async (req, res) => {
  try {
    const options = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };

    res.status(201).cookie("token", null, options).json({
      message: "LogOut",
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
