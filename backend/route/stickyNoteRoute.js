const { userAuth } = require("../auth/userAuth");
const {
  stickyNoteCreate,
  stickyNoteDelete,
  stickyNoteUpdate,
  allStickyNote,
} = require("../controler/stickyNoteController");
// const { userAuth } = require("../auth/userAuth");
const stickyNoteRouter = require("express").Router();

stickyNoteRouter.route("/getAllStickyNote").get(userAuth, allStickyNote);
stickyNoteRouter.route("/stickyNote_create").post(userAuth, stickyNoteCreate);
stickyNoteRouter
  .route("/stickyNote_delete/:itemId")
  .delete(userAuth, stickyNoteDelete);
stickyNoteRouter
  .route("/stickyNote_update/:itemId")
  .put(userAuth, stickyNoteUpdate);

module.exports = stickyNoteRouter;
