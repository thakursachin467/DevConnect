const validator = require('validator');
const isEmpty = require('./isDashEmpty');

module.exports = function validateRegisterUser(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    if (!validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = 'Name must be between 3 and 30 characters';
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Please enter a valid email';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required';
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be between 6 and 30 characters';
    }
    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}