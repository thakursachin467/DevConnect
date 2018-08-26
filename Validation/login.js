const validator = require('validator');
const isEmpty = require('./isDashEmpty');

module.exports = function validateLoginUser(data) {
    let errors = {};
    console.log(isEmpty(data.email))
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if (!validator.isEmail(data.email)) {
        errors.email = 'Please enter a valid email';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }




    return {
        errors,
        isValid: isEmpty(errors)
    }
}