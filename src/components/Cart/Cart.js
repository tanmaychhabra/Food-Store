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
//import { SignalCellularNullSharp } from '@material-ui/icons'

const Cart = (props) => {
  useEffect(() => {
    props.totalAmountChange(props.cartList);
  }, [props.cartList]);

  const incrementHandler = (data) => {
    props.incrementCountChange(data);
  };

  const decrementHandler = (data) => {
    props.decrementCountChange(data);
  };

  return (
    <Table>
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
                  {/* <Table.Cell>{cartData.price * cartData.count}</Table.Cell> */}
                  <Table.Cell>{cartData.individualProductAmount}</Table.Cell>
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
          <Table.Cell>Total Amount: {props.totalAmount}</Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

const mapStateToProps = (state) => {
  return {
    cartList: state.cartProductList,
    totalAmount: state.totalAmount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCountChange: (data) => dispatch(incrementCountChange(data)),
    decrementCountChange: (data) => dispatch(decrementCountChange(data)),
    totalAmountChange: (data) => dispatch(totalAmountChange(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
