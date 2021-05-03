import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "react-router";
import Login from "./components/Login/Login";
import ProductList from "./ProductList/ProductList";
import Navigation from "./Navigation/Navigation";
import Cart from "./components/Cart/Cart";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const App = (props) => {
  // if(props.isLoggedIn === false) {
  //   return <Redirect to = '/' />
  // }
  return (
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" component={Login} />
          <Route
            path="/productList"
            component={props.isLoggedIn ? ProductList : Login}
          />
          <Route path="/cart" component={props.isLoggedIn ? Cart : Login} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
