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
      const filteredCartProduct = state.cartProductList.filter(
        (item) => item.id === action.payload.id
      )[0];

      filteredCartProduct.count = filteredCartProduct.count + 1;
      filteredCartProduct.individualProductAmount = parseFloat(
        (filteredCartProduct.price * filteredCartProduct.count).toFixed(2)
      );
      state.totalAmount = state.totalAmount + filteredCartProduct.price;

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
        filteredCartProductDec.individualProductAmount = parseFloat(
          (filteredCartProductDec.price * filteredCartProductDec.count).toFixed(
            2
          )
        );

        state.totalAmount = state.totalAmount - filteredCartProductDec.price;

        return {
          ...state,
          cartProductList: [...state.cartProductList],
          totalAmount: state.totalAmount,
        };
      } else {
        filteredCartProductDec.individualProductAmount = parseFloat(
          (filteredCartProductDec.price * filteredCartProductDec.count).toFixed(
            2
          )
        );
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

    case "TOTAL_AMOUNT":
      return {
        ...state,
        totalAmount: parseFloat(state.totalAmount.toFixed(2)),
      };

    default:
      return state;
  }
};

export default CartListReducer;
