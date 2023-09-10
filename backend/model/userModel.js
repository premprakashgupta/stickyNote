const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    name: {
      type: String,
    },
    stickyNote: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stickyNoteModel",
      },
    ],
  },
  { timestamps: true }
);
User.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPAIRE,
  });
};
module.exports = mongoose.model("user", User);
