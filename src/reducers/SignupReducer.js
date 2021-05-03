const initialState = {
    signup_firstName: 'Tanmay',
    signup_lastName: 'Chhabra',
    signup_password: '',
}

const SignupReducer = (state = {initialState},action) => {
    switch(action.type) {
        case 'SIGNUP_FIRST_NAME': return {
            ...state,
            signup_firstName: action.payload
        }
        case 'SIGNUP_LAST_NAME': return {
            ...state,
            signup_lastName: action.payload
        }
        case 'SIGNUP_PASSWORD': return {
            ...state,
            signup_password: action.payload
        }
        default: return state
    }
}

export default SignupReducer