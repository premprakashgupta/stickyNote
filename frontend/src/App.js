import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SigninPage from "./components/Signin/SigninPage";
import Main from "./components/Main/Main";
import { useEffect } from "react";
import store from "./redux/store";
import { loadAction } from "./redux/action/userAction";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { loginDetail } = useSelector((state) => state.login);
  useEffect(() => {
    try {
      store.dispatch(loadAction());
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={loginDetail?._id ? <Main /> : <SigninPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
