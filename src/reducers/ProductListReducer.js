const initialState = {
  productList: [],
};

const ProductListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS":
      action.payload.forEach((product, index) => {
        product["id"] = index + 1;
      });
      return {
        ...state,
        productList: action.payload,
      };
    default:
      return state;
  }
};

export default ProductListReducer;
