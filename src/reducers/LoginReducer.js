const initialState = {
  firstName: "",
  isLoggedIn: false,
  productList: [],
  cartProductList: [],
  firstNameError: "",
  emailError: "",
  passwordError: "",
  totalAmount: 0,
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

    case "ADD_PRODUCTS":
      action.payload.forEach((product, index) => {
        product["id"] = index + 1;
      });

      return {
        ...state,
        productList: action.payload,
      };

    case "CART_PRODUCTS":
      action.payload["individualProductAmount"] =
        action.payload.price * action.payload.count;

      state.totalAmount =
        state.totalAmount + action.payload.individualProductAmount;
      return {
        ...state,
        cartProductList: [...state.cartProductList, action.payload],
        totalAmount: state.totalAmount,
      };

    case "INCREMENT_COUNT":
      const filteredCartProduct = state.cartProductList.filter(
        (item) => item.id === action.payload.id
      )[0];

      filteredCartProduct.count = filteredCartProduct.count + 1;
      filteredCartProduct.individualProductAmount =
        filteredCartProduct.price * filteredCartProduct.count;
      state.totalAmount = state.totalAmount + filteredCartProduct.price;

      console.log(state.totalAmount);

      return {
        ...state,
        cartProductList: [...state.cartProductList],
        totalAmount: state.totalAmount,
      };

    case "DECREMENT_COUNT":
      const filteredCartProductDec = state.cartProductList.filter(
        (item) => item.id === action.payload.id
      )[0];

      if (filteredCartProductDec.count > 1) {
        filteredCartProductDec.count = filteredCartProductDec.count - 1;
        filteredCartProductDec.individualProductAmount =
          filteredCartProductDec.price * filteredCartProductDec.count;

        state.totalAmount = state.totalAmount - filteredCartProductDec.price;

        return {
          ...state,
          cartProductList: [...state.cartProductList],
          totalAmount: state.totalAmount,
        };
      } else {
        filteredCartProductDec.individualProductAmount =
          filteredCartProductDec.price * filteredCartProductDec.count;
        filteredCartProductDec.count = filteredCartProductDec.count - 1;
        const newfilteredCart = state.cartProductList.filter(
          (element) => element.id !== action.payload.id
        );
        state.totalAmount = state.totalAmount - filteredCartProductDec.price;
        return {
          ...state,
          cartProductList: [...newfilteredCart],
          totalAmount: state.totalAmount,
        };
      }

    case "FIRST_NAME_ERROR":
      if (action.payload === "") {
        return {
          ...state,
          firstNameError: "Enter correct firstname",
        };
      } else {
        return {
          ...state,
          firstNameError: null,
        };
      }

    case "EMAIL_ERROR":
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(action.payload)) {
        return {
          ...state,
          emailError: "Enter correct mail",
        };
      } else {
        return {
          ...state,
          emailError: null,
        };
      }

    case "PASSWORD_ERROR":
      if (action.payload === "" || action.payload.length < 6) {
        return {
          ...state,
          passwordError: "Enter correct password",
        };
      } else {
        return {
          ...state,
          passwordError: null,
        };
      }

    case "TOTAL_AMOUNT":
      // action.payload.forEach((product, index) => {
      //   state.totalAmount = state.totalAmount + product.individualProductAmount;
      // });

      // return {
      //   ...state,
      //   totalAmount: ...state.totalAmount,
      // };

      return {
        ...state,
        totalAmount: state.totalAmount.toFixed(2),
      };

    default:
      return state;
  }
};

export default LoginReducer;
