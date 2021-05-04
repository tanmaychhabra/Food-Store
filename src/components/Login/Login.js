import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import Navigation from "../../Navigation/Navigation";
import { connect } from "react-redux";
import {
  firstNameChange,
  submitChange,
  firstNameErrorHandler,
  emailErrorHandler,
  passwordErrorHandler,
} from "../../actions/action";
import ProductList from "../../ProductList/ProductList";
import styled from "styled-components";

function Login(props) {
  let [isButtonDisabled, setIsButtonDisabled] = useState(true);
  let [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitChange = () => {
    props.submitHandler();
  };

  const isButtonDisabledHandler = () => {
    //     if(props.firstNameError || props.emailError || props.passwordError) {
    //         setIsButtonDisabled(true)
    //     }
    //     else {
    //         setIsButtonDisabled(false)
    //     }

    if (
      props.emailError !== null ||
      props.firstNameError !== null ||
      props.passwordError !== null
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Wrapper>
      {props.isLoggedIn ? (
        <ProductList />
      ) : (
        <FormWrapper>
          <Form>
            <Form.Field>
              <label>Firstname: </label>
              <input
                type="text"
                value={props.firstName}
                onChange={(e) => {
                  props.firstNameHandler(e.target.value);
                  props.firstNameErrorHandler(props.firstName);
                  isButtonDisabledHandler();
                }}
              />
              <p>{props.firstNameError}</p>
            </Form.Field>
            <Form.Field>
              <label>Email: </label>
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  props.emailErrorHandler(email);
                  isButtonDisabledHandler();
                }}
              />
              <p>{props.emailError}</p>
            </Form.Field>
            <Form.Field>
              <label>Password: </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  props.passwordErrorHandler(password);
                  isButtonDisabledHandler();
                }}
              />
              <p>{props.passwordError}</p>
            </Form.Field>
            <ButtonWrapper
              type="submit"
              onClick={handleSubmitChange}
              disabled={isButtonDisabled}
            >
              Login
            </ButtonWrapper>
          </Form>
        </FormWrapper>
      )}
    </Wrapper>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    firstNameHandler: (data) => dispatch(firstNameChange(data)),
    emailErrorHandler: (data) => dispatch(emailErrorHandler(data)),
    passwordErrorHandler: (data) => dispatch(passwordErrorHandler(data)),
    firstNameErrorHandler: (data) => dispatch(firstNameErrorHandler(data)),
    submitHandler: () => dispatch(submitChange()),
  };
};

const mapStateToProps = (state) => {
  return {
    firstName: state.LoginReducer.firstName,
    isLoggedIn: state.LoginReducer.isLoggedIn,
    firstNameError: state.LoginReducer.firstNameError,
    emailError: state.LoginReducer.emailError,
    passwordError: state.LoginReducer.passwordError,
  };
};

const Wrapper = styled.div`
  width: 100vw;
  background-color: #758283;
  height: 1200px;
`;

const FormWrapper = styled.div`
  padding-top: 25px;
  display: grid;
  place-items: center;
  align: center;
`;

const ButtonWrapper = styled.button`
  background-color: #e8bd0d;
  border: none;
  border-radius: 40px;
  width: 80px;
  height: 30px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
