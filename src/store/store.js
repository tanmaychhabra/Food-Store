import { createStore } from "redux";
import LoginReducer from "../reducers/LoginReducer";

// const initialState = {}

export const store = createStore(
  LoginReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
