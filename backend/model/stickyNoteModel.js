const mongoose = require("mongoose");

const stickyNoteModel = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: "Welcome",
    },
    content: {
      type: String,
    },
    bgColor: {
      type: String,
      default: "orange",
    },
    link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
stickyNoteModel.pre("save", function (next) {
  this.bgColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
    Math.random() * 256
  )},${Math.floor(Math.random() * 256)})`;
  next();
});

module.exports = mongoose.model("stickyNoteModel", stickyNoteModel);
