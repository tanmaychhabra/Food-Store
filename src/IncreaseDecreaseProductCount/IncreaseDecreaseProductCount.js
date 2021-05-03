import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { connect } from "react-redux";

function IncreaseDecreaseProductCount(props) {
  return (
    <>
      <AiFillMinusCircle />
      <h3>{props.cartProductList.name}</h3>
      <AiFillPlusCircle />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    cartProductList: state.cartProductList,
  };
};

export default connect(mapStateToProps)(IncreaseDecreaseProductCount);
