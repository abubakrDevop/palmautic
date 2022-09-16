import { emailReg } from "./regex"

export const required = 'Это поле не может быть пустым!'

export const email = {
    required,
    pattern: {
        value: emailReg,
        message: 'Email не валиден!'
    }
}

export const allInputs = {
    required,
    pattern: {
        value: true,
    },
    minLength: {
        value: 3,
        message: 'Должен содержать не менее 3 букв!'
    }
}