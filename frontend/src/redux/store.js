import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension"; // use when website is in development process for connection with redux tool
import { LoginReducer } from "./reducer/userReducer";
import { stickyNoteReducer } from "./reducer/stickyNoteReducer";

const reducer = combineReducers({
  login: LoginReducer,
  stickyNote: stickyNoteReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  //use 'compose' in production otherwise use 'composeWithDevTools' in development phase
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
