const FIRSTNAME = "FIRSTNAME";
const SUBMIT = "SUBMIT";
const ADD_PRODUCTS = "ADD_PRODUCTS";
const CART_PRODUCTS = "CART_PRODUCTS";
const INCREMENT_COUNT = "INCREMENT_COUNT";
const DECREMENT_COUNT = "DECREMENT_COUNT";
const EMAIL_ERROR = "EMAIL_ERROR";
const PASSWORD_ERROR = "PASSWORD_ERROR";
const FIRST_NAME_ERROR = "FIRST_NAME_ERROR";
const TOTAL_AMOUNT = "TOTAL_AMOUNT";

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
  return {
    type: ADD_PRODUCTS,
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

export const emailErrorHandler = (data) => {
  return {
    type: EMAIL_ERROR,
    payload: data,
  };
};

export const firstNameErrorHandler = (data) => {
  return {
    type: FIRST_NAME_ERROR,
    payload: data,
  };
};

export const passwordErrorHandler = (data) => {
  return {
    type: PASSWORD_ERROR,
    payload: data,
  };
};

export const totalAmountChange = (data) => {
  return {
    type: TOTAL_AMOUNT,
    payload: data,
  };
};
