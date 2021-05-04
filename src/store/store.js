import { createStore, combineReducers } from "redux";
import LoginReducer from "../reducers/LoginReducer";
import ProductListReducer from "../reducers/ProductListReducer";
import CartListReducer from "../reducers/CartListReducer";

const rootReducer = combineReducers({
  LoginReducer: LoginReducer,
  ProductListReducer: ProductListReducer,
  CartListReducer: CartListReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
