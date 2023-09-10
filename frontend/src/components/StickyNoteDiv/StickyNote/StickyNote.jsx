import React, { useEffect, useRef, useState } from "react";
import "./StickyNote.css";
import {
  RiCheckFill,
  RiCloseCircleFill,
  RiDeleteBin6Fill,
} from "react-icons/ri";
import { BsPaletteFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  stickyNoteDelAction,
  stickyNoteUpdateAction,
} from "../../../redux/action/stickyNoteAction";
import { toast } from "react-toastify";

const StickyNote = ({ stickyNoteObj }) => {
  const [heading, setHeading] = useState(stickyNoteObj.heading);
  const [content, setContent] = useState(stickyNoteObj.content);
  const [colorDisplay, setcolorDisplay] = useState(undefined);

  const dispatch = useDispatch();
  const handleDeleteStickyNote = (id) => {
    try {
      dispatch(stickyNoteDelAction(id));
    } catch (error) {
      toast.warning(error);
    }
  };

  useEffect(() => {
    if (
      stickyNoteObj.heading !== heading ||
      stickyNoteObj.content !== content
    ) {
      document.getElementById(`${stickyNoteObj._id.toString()}`).style.display =
        "flex";
    } else {
      document.getElementById(`${stickyNoteObj._id.toString()}`).style.display =
        "none";
    }
  }, [heading, content]);

  const handleSubmit = (id) => {
    try {
      dispatch(
        stickyNoteUpdateAction(id, {
          ...stickyNoteObj,
          content: content,
          heading: heading,
        })
      );
      document.getElementById(`${stickyNoteObj._id.toString()}`).style.display =
        "none";
    } catch (error) {
      toast.warning(error);
    }
  };
  const handleColorDisplay = () => {
    setcolorDisplay(colorDisplay === "act" ? undefined : "act");
  };
  return (
    <>
      <div className="noteHolder">
        <input type="checkbox" id="fold1" className="btn" />
        <div
          className="note rounded"
          style={{ backgroundColor: stickyNoteObj.bgColor }}
        >
          <input
            type="text"
            placeholder="Title"
            value={heading}
            id="heading"
            onChange={(e) => setHeading(e.target.value)}
          />

          <div className="wrapper">
            <div
              onInput={(e) => setContent(e.target.innerHTML)}
              dangerouslySetInnerHTML={{ __html: content }}
              contentEditable={true}
              id="content"
              className="content"
            ></div>
            <a href={stickyNoteObj?.link}>Media Link</a>
          </div>
        </div>
        <div className="action">
          <div className={`colors ${colorDisplay}`}>
            <div className="note-yellow"></div>
            <div className="note-green"></div>
            <div className="note-levendor"></div>
            <div className="note-orange"></div>
          </div>

          <div className="actionBtn">
            <button
              type="button"
              id={stickyNoteObj._id.toString()}
              className="btn btn-submit"
              onClick={() => handleSubmit(stickyNoteObj._id)}
            >
              <RiCheckFill />
            </button>
            <button
              type="button"
              className="btn btn-edit"
              onClick={handleColorDisplay}
            >
              {colorDisplay === "act" ? (
                <RiCloseCircleFill size={21} />
              ) : (
                <BsPaletteFill />
              )}
            </button>
            <button
              type="button"
              className="btn btn-del"
              onClick={() => handleDeleteStickyNote(stickyNoteObj?._id)}
            >
              <RiDeleteBin6Fill />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyNote;
