import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { connect } from "react-redux";
import styled from "styled-components";
import Cart from "../components/Cart/Cart";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles((theme) => ({
  badge: {
    left: 3,
    top: -12,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 8px",
  },
}))(Badge);

const Navigation = (props) => {
  const handleCartClick = (e) => {
    return <Cart />;
  };
  return (
    <div>
      {props.isLoggedIn ? (
        <nav className="nav-bar">
          <ul className="nav-links">
            <li style={{ "list-style": "none" }}>
              <h2>Food App</h2>
            </li>
            <li style={{ "list-style": "none" }}>
              <h3>Hi {props.userFirstName}</h3>
            </li>
            <li style={{ "list-style": "none" }}>
              <IconWrapper>
                <IconButton aria-label="cart">
                  <StyledBadge
                    badgeContent={props.cartProductList.length}
                    color="secondary"
                  />
                  <ShoppingCartIcon />
                </IconButton>

                <button onClick={handleCartClick}>
                  <h4>
                    <Link style={{ color: "black" }} to="/cart">
                      GO TO CART
                    </Link>
                  </h4>
                </button>
              </IconWrapper>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="nav-bar">
          <ul className="nav-links">
            <li style={{ "list-style": "none" }}>
              <h2>Food App</h2>
            </li>
            <LinkWrapper>
              <Link to="/login" style={{ color: "black", pointer: "cursor" }}>
                Login
              </Link>
            </LinkWrapper>
          </ul>
        </nav>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userFirstName: state.firstName,
    isLoggedIn: state.isLoggedIn,
    cartProductList: state.cartProductList,
  };
};

const IconWrapper = styled.div`
  width: 140px;
  display: grid;
  grid-template-columns: 20% 80%;
  place-items: center;
  background: none;
  border: none;
  padding: 18px;

  button {
    border: none;
    background: none;
  }

  :hover {
    cursor: pointer;
    border-radius: 30px;
    background-color: #de4839;
    border: none;
  }
`;

const LinkWrapper = styled.h3`
  margin-top: 12px;
  display: grid;
  grid-template-columns: 30%;
  text-decoration: none;
  border: none;
  background: none;
  color: black;
`;

export default connect(mapStateToProps)(Navigation);
