const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
exports.userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ massage: "login again" });
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decodeData);
    req.userAllData = await userModel
      .findById(decodeData.id)
      .populate("stickyNote");

    next();
  } catch (error) {
    res.status(401).json(error);
  }
};
