const initialState = {
  firstName: null,
  isLoggedIn: false,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FIRSTNAME":
      return {
        ...state,
        firstName: action.payload,
      };

    case "SUBMIT":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        firstName: null,
      };
    default:
      return state;
  }
};

export default LoginReducer;
