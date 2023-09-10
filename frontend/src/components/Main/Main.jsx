import React from "react";
import { ToastContainer } from "react-toastify";
import DialogBox from "../DialogBox/DialogBox";
import StickyNoteMain from "../StickyNoteDiv/StickyNoteMain";
import "./Main.css";
const Main = () => {
  return (
    <div className="mainDiv">
      <StickyNoteMain />
      <DialogBox />
      <ToastContainer />
    </div>
  );
};

export default Main;
