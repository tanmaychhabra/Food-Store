const initialState = {
  cartProductList: [],
  totalAmount: 0,
};

const CartListReducer = (state = initialState, action) => {
  switch (action.type) {
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
      state.totalAmount = state.totalAmount + action.payload.price;

      return {
        ...state,
        cartProductList: [...state.cartProductList],
        totalAmount: state.totalAmount,
      };

    case "DECREMENT_COUNT":
      if (action.payload.count >= 1) {
        state.totalAmount = state.totalAmount - action.payload.price;

        return {
          ...state,
          cartProductList: [...state.cartProductList],
          totalAmount: state.totalAmount,
        };
      } else {
        const newfilteredCart = state.cartProductList.filter(
          (element) => element.id !== action.payload.id
        );
        state.totalAmount = state.totalAmount - action.payload.price;
        return {
          ...state,
          cartProductList: [...newfilteredCart],
          totalAmount: state.totalAmount,
        };
      }

    case "TOTAL_AMOUNT":
      return {
        ...state,
        totalAmount: parseFloat(state.totalAmount.toFixed(2)),
      };

    case "LOGOUT_CART_PRODUCT_LIST_EMPTY":
      // return {
      //   ...state,
      //   cartProductList: initialState.cartProductList,
      // };
      return initialState;

    default:
      return state;
  }
};

export default CartListReducer;
