const validator = require('validator');
const isEmpty = require('./isDashEmpty');

module.exports = function validateRegisterUser(data) {
    let errors = {};
    if (!validator.isLength(data.name, { min: 3, max: 30 })) {
        errors.name = 'Name must be between 3 and 30 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}