import React, { useEffect, useState } from "react";
import {
  addProductsChange,
  productsToDisplayOnScroll,
  cartProductsAdd,
} from "../actions/action";
import { connect } from "react-redux";
import { Card, Image } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { incrementCountChange, decrementCountChange } from "../actions/action";
import { Grid, Button } from "semantic-ui-react";
import { Redirect } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import "./ProductList.css";

function ProductList(props) {
  const [loading, setLoading] = useState(false);
  let startIndex = 0;
  let endIndex = 6;
  let allProducts = [];

  // useEffect(() => {
  //   // const data = Data
  //   // props.handleProductAdd(data)

  //   if (!props.cartProductList.length) {
  //     axios.get("./ProductList.json").then((response) => {
  //       props.handleProductAdd(response.data);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (!props.cartProductList.length) {
      axios.get("./ProductList.json").then((response) => {
        allProducts = response.data;
        props.handleProductAdd(allProducts);
        let productsToDisplayOnFirstLoad = allProducts.slice(
          startIndex,
          endIndex
        );
        props.productsToDisplayOnScroll([...productsToDisplayOnFirstLoad]);
      });
    }
  }, []);

  // startIndex = startIndex + 6;
  // endIndex = endIndex + 6;

  // window.addEventListener("scroll", function () {
  //   let scrollPosition = window.scrollY;
  //   let productsToDisplayOnScroll = [];
  //   if (scrollPosition === 657) {
  //     startIndex = startIndex + 6;
  //     endIndex = endIndex + 6;
  //     productsToDisplayOnScroll = allProducts.slice(startIndex, endIndex);
  //     console.log(productsToDisplayOnScroll);
  //     props.handleProductAdd(productsToDisplayOnScroll);
  //   }

  //   console.log(startIndex, endIndex);
  // });

  // useEffect(() => {
  //   // const data = Data
  //   // props.handleProductAdd(data)
  //   if (!props.cartProductList.length) {
  //     axios.get("./ProductList.json").then((response) => {
  //       const productsToDisplay = response.data.slice(startIndex, endIndex);
  //       props.handleProductAdd(productsToDisplay);
  //     });
  //   }
  // }, []);

  // if (scrollPosition > 290) {
  //   startIndex = startIndex + 6;
  //   endIndex = endIndex + 6;
  //   const productsToDisplay = props.productData.slice(startIndex, endIndex);
  //   props.handleProductAdd(productsToDisplay);
  // }

  window.addEventListener("scroll", function () {
    //var wrap = document.getElementById("wrap");
    //var contentHeight = wrap.offsetHeight; // Gets page content height
    var yOffset = window.pageYOffset; // Gets the vertical scroll position
    var y = yOffset + window.innerHeight;

    if (y >= 657 && y <= 659) {
      //wrap.innerHTML += '<div className = "newData"></div>';
      startIndex = startIndex + 6;
      endIndex = endIndex + 6;
      const productsToDisplay = allProducts.slice(startIndex, endIndex);
      props.productsToDisplayOnScroll([...productsToDisplay]);
      //modifiedProductsChange(productsToDisplay);
    }
  });

  const submitHandler = (data) => {
    data["count"] = 1;
    props.handleCartAdd(data);
  };

  const handleCountChange = (product, operation) => {
    switch (operation) {
      case "increase":
        product.count = product.count + 1;
        product.individualProductAmount = parseFloat(
          (product.price * product.count).toFixed(2)
        );
        props.incrementCountChange(product);
        break;

      case "decrease":
        if (product.count > 1) {
          product.count = product.count - 1;
          product.individualProductAmount = parseFloat(
            (product.price * product.count).toFixed(2)
          );
          props.decrementCountChange(product);
        } else {
          product.individualProductAmount = parseFloat(
            (product.price * product.count).toFixed(2)
          );
          product.count = product.count - 1;
          props.decrementCountChange(product);
        }
        break;
      default:
        return {
          product,
        };
    }
  };

  const modifiedProductsChange = (productsToDisplay) => {
    for (let i = 0; i < productsToDisplay.length; i++) {}
  };

  return (
    <div id="wrap" style={{ backgroundColor: "#758283" }}>
      {props.isLoggedIn ? (
        <>
          <Grid>
            <Grid.Row style={{ padding: "20px" }}>
              {props.modifiedProductData &&
                props.modifiedProductData.map((product, index) => {
                  return (
                    <Grid.Column mobile={4} tablet={4} computer={5}>
                      <Card style={{ marginTop: "20px" }}>
                        <Image src={product.image} />
                        <Card.Content>
                          <Card.Header>{product.name}</Card.Header>
                          <Card.Description>
                            {product.description}
                          </Card.Description>
                          {product.count > 0 ? (
                            <QuantityWrapper>
                              <AiFillMinusCircle
                                size="30"
                                onClick={() =>
                                  handleCountChange(product, "decrease")
                                }
                              />
                              <h3>{product.count}</h3>
                              <AiFillPlusCircle
                                size="30"
                                onClick={() =>
                                  handleCountChange(product, "increase")
                                }
                              />
                            </QuantityWrapper>
                          ) : (
                            <ButtonWrapper
                              onClick={() => submitHandler(product)}
                            >
                              ADD TO CART
                            </ButtonWrapper>
                          )}
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  );
                })}
            </Grid.Row>
          </Grid>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialProductData: state.ProductListReducer.initialProductList,
    modifiedProductData: state.ProductListReducer.modifiedProductList,
    cartProductList: state.CartListReducer.cartProductList,
    isLoggedIn: state.LoginReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleProductAdd: (data) => dispatch(addProductsChange(data)),
    productsToDisplayOnScroll: (data) =>
      dispatch(productsToDisplayOnScroll(data)),
    handleCartAdd: (data) => dispatch(cartProductsAdd(data)),
    incrementCountChange: (data) => dispatch(incrementCountChange(data)),
    decrementCountChange: (data) => dispatch(decrementCountChange(data)),
  };
};

// const Wrapper = styled.div`
// display: grid;
// grid-template-columns: repeat(3, 30%);
// align-content: center;
// height: 1000px;
// `

const QuantityWrapper = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  place-items: center;
  width: 250px;

  h3 {
    align: center;
  }

  @media (max-width: 991px) {
    display: grid;
    grid-template-columns: auto auto auto;
    width: auto;
  })
`;

const ButtonWrapper = styled.button`
  border-radius: 30px;
  border: none;
  height: 40px;
  margin-top: 20px;
  width: 120px;

  @media (max-width: 710px) {
    height: auto;
    width: auto;
    border-radius: auto;
  }

  :hover {
    background-color: #d82e2f;
    border-radius: 30px;
    border: none;
    cursor: pointer;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
