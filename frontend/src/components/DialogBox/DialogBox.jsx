import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";
import "./DialogBox.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createStickyNoteAction } from "../../redux/action/stickyNoteAction";
import { toast } from "react-toastify";
const DialogBox = () => {
  const [dialogBox, setdialogBox] = useState(-110);

  const [Title, setTitle] = useState("");
  const [QuillValue, setQuillValue] = useState("");
  const [Link, setLink] = useState("");
  const dispatch = useDispatch();
  const handleShowDialog = () => {
    setdialogBox(dialogBox === -110 ? 0 : -110);
  };

  const handleSubmit = async () => {
    console.log(QuillValue);

    if (Title === "" || QuillValue === "") {
      return toast("Title and Description is required");
    }
    await dispatch(
      createStickyNoteAction({
        heading: Title,
        content: QuillValue,
        link: Link,
      })
    );

    setTitle("");
    setQuillValue("");
    setdialogBox(-110);
  };

  return (
    <div className="dialogBoxContainer">
      <button className="floatingActionBtn" onClick={handleShowDialog}>
        <BsPlus size={28} />
      </button>

      <div
        className="DialogBox"
        style={{ transform: `translate(-50%,${dialogBox}%)` }}
      >
        <div className="form-group">
          <label htmlFor="noteHeader">
            <strong>Title</strong>
          </label>
          <input
            type="text"
            id="heading"
            className="form-control"
            placeholder="title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="noteDescription">
            <strong>Description</strong>
          </label>
          <ReactQuill
            theme="snow"
            value={QuillValue}
            onChange={setQuillValue}
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">
            <strong>Image/Video Link</strong>
          </label>
          <input
            type="text"
            id="link"
            className="form-control"
            placeholder="Url"
            value={Link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        {Link && (
          <div className="preview">
            {Link.split(".")[Link.split(".").length - 1] === "mp4" ? (
              <video src={Link}></video>
            ) : (
              <img src={Link} alt="" />
            )}
          </div>
        )}
        <div className="form-group">
          <button className="btn" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
