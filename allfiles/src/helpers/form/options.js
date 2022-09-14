import { emailReg, passwordReg } from "./regex"

export const required = 'Field cannot be empty!'

export const email = {
    required,
    pattern: {
        value: emailReg,
        message: 'Email is not valid!'
    }
}

export const allInputs = {
    required,
    pattern: {
        value: true,
    },
    minLength: {
        value: 5,
        message: 'Password must contain at least 5 letters!'
    }
}