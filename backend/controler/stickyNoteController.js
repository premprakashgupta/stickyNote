const stickyNoteModel = require("../model/stickyNoteModel");
const UserModel = require("../model/userModel");

exports.allStickyNote = async (req, res) => {
  try {
    const data = await UserModel.findById(req.userAllData.id).populate(
      "stickyNote"
    );

    res.status(201).json(data.stickyNote);
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.stickyNoteCreate = async (req, res) => {
  try {
    const stickyNoteData = req.body;
    console.log(stickyNoteData);
    const createdId = await stickyNoteModel.create(stickyNoteData);
    req.userAllData.stickyNote.push(createdId);
    await req.userAllData.save();

    res.status(201).json({ data: createdId, message: "sticky note added" });
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.stickyNoteDelete = async (req, res) => {
  try {
    req.userAllData.stickyNote = req.userAllData.stickyNote.filter(
      (f) => f._id.toString() !== req.params.itemId.toString()
    );
    await req.userAllData.save();

    res.status(201).json({
      data: req.params.itemId,
      message: "sticky note deleted",
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.stickyNoteUpdate = async (req, res) => {
  try {
    const data = await stickyNoteModel.findByIdAndUpdate(
      req.params.itemId,
      req.body,
      {
        new: true,
      }
    );
    // await stickyNoteModel.save();

    res.status(201).json({
      data,
      message: "sticky note updated",
    });
  } catch (error) {
    res.status(404).json(error);
  }
};
