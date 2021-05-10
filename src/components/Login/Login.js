import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
// import Navigation from "../../Navigation/Navigation";
import { connect } from "react-redux";
import { firstNameChange, submitChange } from "../../actions/action";
import ProductList from "../../ProductList/ProductList";
import styled from "styled-components";

function Login(props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const handleSubmitChange = () => {
    // if (props.firstName === "admin" && email === "admin123@gmail.com") {
    //   props.history.push("/productList");
    //   props.submitHandler();
    // }
    props.history.push("/productList");
    props.submitHandler();
  };

  const firstNameErrorHandler = () => {
    if (props.firstName < 2) {
      setFirstNameError("Enter correct first name");
    } else {
      setFirstNameError(null);
    }
  };

  const emailErrorHandler = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!pattern.test(email)) {
      setEmailError("Enter correct email");
    } else {
      setEmailError(null);
    }
  };

  const passwordErrorHandler = () => {
    if (password === "" || password.length < 6) {
      setPasswordError("Enter correct password");
    } else {
      setPasswordError(null);
    }
  };

  const isButtonDisabledHandler = () => {
    if (
      emailError !== null ||
      firstNameError !== null ||
      passwordError !== null
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <Form>
          <Form.Field>
            <label>Firstname: </label>
            <input
              type="text"
              value={props.firstName}
              onChange={(e) => {
                props.firstNameHandler(e.target.value);
                firstNameErrorHandler();
                isButtonDisabledHandler();
              }}
            />
            <p>{firstNameError}</p>
          </Form.Field>
          <Form.Field>
            <label>Email: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                emailErrorHandler();
                isButtonDisabledHandler();
              }}
            />
            <p>{emailError}</p>
          </Form.Field>
          <Form.Field>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                passwordErrorHandler();
                isButtonDisabledHandler();
              }}
            />
            <p>{passwordError}</p>
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
    </Wrapper>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    firstNameHandler: (data) => dispatch(firstNameChange(data)),
    submitHandler: () => dispatch(submitChange()),
  };
};

const mapStateToProps = (state) => {
  return {
    firstName: state.LoginReducer.firstName,
    isLoggedIn: state.LoginReducer.isLoggedIn,
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
