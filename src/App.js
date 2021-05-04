import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router";
import Login from "./components/Login/Login";
import ProductList from "./ProductList/ProductList";
import Navigation from "./Navigation/Navigation";
import Cart from "./components/Cart/Cart";
import { connect } from "react-redux";

const App = (props) => {
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/productList" component={ProductList} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    firstName: state.firstName,
  };
};

export default connect(mapStateToProps)(App);
