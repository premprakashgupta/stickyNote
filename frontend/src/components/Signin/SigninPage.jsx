import React, { useEffect, useState } from "react";
import "./SigninPage.css";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/action/userAction";
const SigninPage = () => {
  const colorArr = [
    "orange",
    "lightblue",
    "lightgreen",
    "yellow",
    "fuchsia",
    "cyan",
    "darkcyan",
    "carol",
    "chocolate",
  ];
  const [color, setcolor] = useState(colorArr[0]);
  useEffect(() => {
    // setInterval(() => {
    setcolor(colorArr[Math.floor(Math.random() * 8)]);
    // }, 40000);
  }, []);

  const [data, setdata] = useState({});
  const dispatch = useDispatch();
  const handleData = (e) => {
    setdata({ ...data, [e.target.id]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      if (data.email === undefined || data.password === undefined) {
        return alert("empty");
      }
      await dispatch(loginAction(data));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signinPage">
      <div className="signinPageContent">
        <div className="signinPageLeft">
          <div className="signinPageLeftContent">
            <h2>
              Make Your <br /> <span style={{ color: color }}>Notes</span> here
              ...
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repudiandae, harum architecto explicabo cumque, vero sunt totam
              unde quas sapiente laudantium dolore fugiat nisi eum tempore at
              autem atque libero? Tenetur.
            </p>
          </div>
        </div>
        <div className="signinPageRight">
          <div className="forBg">
            <Draggable cancel=".cancel">
              <div
                className="form"
                style={{
                  backgroundColor: color,
                }}
              >
                <div className="form-group">
                  <label htmlFor="username">Username/Email</label>
                  <input
                    style={{ width: "fit-content" }}
                    type="text"
                    className="form-control cancel"
                    placeholder="username"
                    id="email"
                    onChange={(e) => handleData(e)}
                    autoComplete="off"
                    autoFocus={true}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    style={{ width: "fit-content" }}
                    type="password"
                    className="form-control cancel"
                    placeholder="password"
                    id="password"
                    onChange={(e) => handleData(e)}
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <button className="btn cancel" onClick={handleSubmit}>
                    submit
                  </button>
                </div>
              </div>
            </Draggable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
