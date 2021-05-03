import React, { useEffect } from "react";
import { addProductsChange, cartProductsAdd } from "../actions/action";
import { connect } from "react-redux";
import { Card, Image } from "semantic-ui-react";
import styled from "styled-components";
import axios from "axios";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { incrementCountChange, decrementCountChange } from "../actions/action";
import { Grid } from "semantic-ui-react";

function ProductList(props) {
  useEffect(() => {
    // const data = Data
    // props.handleProductAdd(data)
    if (!props.cartProductList.length) {
      axios.get("./ProductList.json").then((response) => {
        props.handleProductAdd(response.data);
      });
    }
  }, []);

  const submitHandler = (data) => {
    // console.log(data)
    data["count"] = 1;
    props.handleCartAdd(data);
  };

  const handleCountChange = (product, operation) => {
    switch (operation) {
      case "increase":
        props.incrementCountChange(product);
        break;

      case "decrease":
        props.decrementCountChange(product);
        break;

      default:
        return {
          product,
        };
    }
  };
  return (
    <div style={{ backgroundColor: "#758283" }}>
      <Grid columns={3}>
        <Grid.Row>
          {props.productData &&
            props.productData.map((product, index) => {
              return (
                <Grid.Column>
                  <Card style={{ marginTop: "20px" }}>
                    <Image src={product.image} />
                    <Card.Content>
                      <Card.Header>{product.name}</Card.Header>
                      <Card.Description>{product.description}</Card.Description>
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
                        <ButtonWrapper onClick={() => submitHandler(product)}>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    productData: state.productList,
    cartProductList: state.cartProductList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleProductAdd: (data) => dispatch(addProductsChange(data)),
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

const CardWrapper = styled.div`
  width: 100vw;
  margin: 40px;
`;

const QuantityWrapper = styled.div`
  display: grid;
  grid-template-columns: 30% 40% 30%;
  place-items: center;
  width: 250px;

  h3 {
    align: center;
  }
`;

const ButtonWrapper = styled.button`
  border-radius: 30px;
  border: none;
  height: 40px;
  margin-top: 20px;
  width: 120px;

  :hover {
    background-color: #d82e2f;
    border-radius: 30px;
    border: none;
    cursor: pointer;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
