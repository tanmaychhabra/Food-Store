import React from 'react'
import {Form, Button, Checkbox} from 'semantic-ui-react'
import Navigation from '../../Navigation/Navigation'
import {signupFirstNameChange, signupLastNameChange, signupPasswordChange} from '../../actions/action'
import {connect} from 'react-redux'

function Signup(props) {
    return (
        <React.Fragment>
            <Navigation />
        <Form>
            <Form.Field>
                <label>FirstName: </label>
                <input type = 'text' value = {props.signup_firstName} onChange = {(e) => props.firstNameHandler(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>LastName: </label>
                <input type = 'text' value = {props.signup_lastName} onChange = {(e) => props.lastNameHandler(props.lastName)}/>
            </Form.Field>
            <Form.Field>
                <label>Password: </label>
                <input type = 'password' value = {props.signup_password} onChange = {(e) => props.passwordHandler(props.password)}/>
            </Form.Field>
            <Form.Field>
                <Checkbox label = 'I agree to the terms and conditions' />
            </Form.Field>
            <Button type = 'submit' >Signup</Button>
        </Form>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        firstNameHandler: (fname) => dispatch(signupFirstNameChange(fname)),
        lastNameHandler: (lname) => dispatch(signupLastNameChange(lname)),
        passwordHandler: (data) => dispatch(signupPasswordChange(data))
    }
}

const mapStateToProps = (state) => {
    return {
        firstName: state.signup_firstName,
        lastName: state.signup_lastName,
        password: state.signup_password
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup)