const initialState = {
  initialProductList: [],
  modifiedProductList: [],
};

const ProductListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCTS":
      action.payload.forEach((product, index) => {
        product["id"] = index + 1;
      });
      return {
        ...state,
        initialProductList: action.payload,
      };

    case "MODIFIED_PRODUCTS":
      console.log(action.payload);
      state.modifiedProductList.push(...action.payload);
      console.log(state.modifiedProductList);
      return {
        ...state,
        modifiedProductList: [...state.modifiedProductList],
      };
    default:
      return state;
  }
};

export default ProductListReducer;
