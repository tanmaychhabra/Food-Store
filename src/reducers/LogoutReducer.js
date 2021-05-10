const initialState = {
  isLoggedOut: false,
};

const Logout = (state = initialState, action) => {
  switch (action.type) {
    case "LOGOUT":
      return {
        isLoggedOut: true,
      };
    default:
      return state;
  }
};

export default Logout;
