import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./StickyNoteMainDiv.css";

import { logOutAction } from "../../redux/action/userAction";
import { stickyNoteAction } from "../../redux/action/stickyNoteAction";
import { ColorRing } from "react-loader-spinner";
import StickyNote from "./StickyNote/StickyNote";

const StickyNoteMain = () => {
  const [filteredNotes, setFilteredNotes] = useState([]);

  const { stickyNoteArr, msg, loader } = useSelector(
    (state) => state.stickyNote
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stickyNoteAction());
  }, [dispatch]);
  useEffect(() => {
    setFilteredNotes(stickyNoteArr);
  }, [stickyNoteArr]);
  useEffect(() => {
    toast(msg);
  }, [msg]);
  const handleLogout = async () => {
    await dispatch(logOutAction());
    window.location.reload();
  };
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();

    const temp = stickyNoteArr.filter((item) =>
      item.heading.toLowerCase().includes(input)
    );

    setFilteredNotes(temp);
  };

  const handleSort = (e) => {
    let temp;
    if (e.target.value === "asc") {
      temp = [...filteredNotes].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else {
      temp = [...filteredNotes].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredNotes(temp);
  };

  return (
    <>
      {loader ? (
        <ColorRing
          visible={true}
          height="150"
          width="150"
          ariaLabel="blocks-loading"
          wrapperStyle={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      ) : (
        <div>
          <header>
            <nav>
              <div className="search">
                <input
                  type="search"
                  placeholder="search here by title"
                  onChange={handleSearch}
                />
              </div>
              <select onChange={handleSort} name="" id="">
                <option value="asc">asc</option>
                <option value="desc">desc</option>
              </select>
              <button className="logoutbtn btn" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          </header>
          <div className="stickyNoteBigContainer">
            {filteredNotes?.length > 0 ? (
              filteredNotes?.map((i, index) => (
                <span className="draggableContainer" key={i._id}>
                  <Draggable cancel=".cancel">
                    <div className="stickyNoteContainer">
                      <span className="stickyNoteHandle">{index + 1}</span>
                      <div className="stickyNote cancel">
                        <StickyNote stickyNoteObj={i} />
                      </div>
                    </div>
                  </Draggable>
                </span>
              ))
            ) : (
              <div className="emptyData">
                <h1>Write Your Note here</h1>
                <p>click on + icon</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default StickyNoteMain;
