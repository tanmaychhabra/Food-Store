const FIRSTNAME = "FIRSTNAME";
const SUBMIT = "SUBMIT";
const ADD_PRODUCTS = "ADD_PRODUCTS";
const MODIFIED_PRODUCTS = "MODIFIED_PRODUCTS";
const CART_PRODUCTS = "CART_PRODUCTS";
const INCREMENT_COUNT = "INCREMENT_COUNT";
const DECREMENT_COUNT = "DECREMENT_COUNT";
const TOTAL_AMOUNT = "TOTAL_AMOUNT";
const LOGOUT = "LOGOUT";
const LOGOUT_CART_PRODUCT_LIST_EMPTY = "LOGOUT_CART_PRODUCT_LIST_EMPTY";

export const firstNameChange = (data) => {
  return {
    type: FIRSTNAME,
    payload: data,
  };
};

export const submitChange = () => {
  return {
    type: SUBMIT,
    payload: true,
  };
};

export const addProductsChange = (data) => {
  console.log("Called Product Add");
  return {
    type: ADD_PRODUCTS,
    payload: data,
  };
};

export const productsToDisplayOnScroll = (data) => {
  return {
    type: MODIFIED_PRODUCTS,
    payload: data,
  };
};

export const cartProductsAdd = (data) => {
  return {
    type: CART_PRODUCTS,
    payload: data,
  };
};

export const incrementCountChange = (data) => {
  return {
    type: INCREMENT_COUNT,
    payload: data,
  };
};

export const decrementCountChange = (data) => {
  return {
    type: DECREMENT_COUNT,
    payload: data,
  };
};

export const totalAmountChange = (data) => {
  return {
    type: TOTAL_AMOUNT,
    payload: data,
  };
};

export const handleLogout = () => {
  return {
    type: LOGOUT,
  };
};

export const handleCartProductListEmpty = () => {
  return {
    type: LOGOUT_CART_PRODUCT_LIST_EMPTY,
  };
};
