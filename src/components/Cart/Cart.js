import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Header, Image, Table } from "semantic-ui-react";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import {
  incrementCountChange,
  decrementCountChange,
  totalAmountChange,
} from "../../actions/action";
import { Redirect } from "react-router";
import styled from "styled-components";

const Cart = (props) => {
  useEffect(() => {
    props.totalAmountChange(props.cartList);
  }, [props.cartList]);

  const incrementHandler = (data) => {
    data.count = data.count + 1;
    data.individualProductAmount = parseFloat(
      (data.price * data.count).toFixed(2)
    );
    props.incrementCountChange(data);
  };

  const decrementHandler = (data) => {
    if (data.count > 1) {
      data.count = data.count - 1;
      data.individualProductAmount = parseFloat(
        (data.price * data.count).toFixed(2)
      );
      props.decrementCountChange(data);
    } else {
      data.individualProductAmount = parseFloat(
        (data.price * data.count).toFixed(2)
      );
      data.count = data.count - 1;
      props.decrementCountChange(data);
    }
  };

  return (
    <div>
      {props.isLoggedIn ? (
        <>
          <Table responsive>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product Name</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Total Amount</Table.HeaderCell>
                <Table.HeaderCell>Increase/ Decrease Quantity</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {props.cartList.length ? (
                props.cartList &&
                props.cartList.map((cartData) => {
                  return (
                    <>
                      <Table.Row>
                        <Table.Cell>
                          <Header>
                            <Image src={cartData.image} />
                            <Header.Content>{cartData.name}</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{cartData.count}</Table.Cell>
                        <Table.Cell>
                          {cartData.individualProductAmount}
                        </Table.Cell>
                        <Table.Cell>
                          <AiFillMinusCircle
                            style={{
                              marginRight: "30px",
                              marginLeft: "30px",
                              alignContent: "center",
                            }}
                            size="30"
                            onClick={() => decrementHandler(cartData)}
                          />
                          <AiFillPlusCircle
                            style={{ alignContent: "center" }}
                            size="30"
                            onClick={() => incrementHandler(cartData)}
                          />
                        </Table.Cell>
                      </Table.Row>
                    </>
                  );
                })
              ) : (
                <h2 style={{ textAlign: "center" }}>No Products in the cart</h2>
              )}
              <Table.Row>
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell style={{ alignContent: "center" }}>
                  <TotalAmountWrapper>
                    Final Amount: {props.totalAmount}
                  </TotalAmountWrapper>
                </Table.Cell>
                <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartList: state.CartListReducer.cartProductList,
    totalAmount: state.CartListReducer.totalAmount,
    isLoggedIn: state.LoginReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCountChange: (data) => dispatch(incrementCountChange(data)),
    decrementCountChange: (data) => dispatch(decrementCountChange(data)),
    totalAmountChange: (data) => dispatch(totalAmountChange(data)),
  };
};

const TotalAmountWrapper = styled.div`
  font-weight: bold;
  display: grid;
  grid-template-columns: repeat(2, auto);
`;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
