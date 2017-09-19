import Validator from 'validator';
import _ from 'lodash';

export default function validateInput(data) {
    let errors = {};
    
    if (Validator.isEmpty(data.user)) {
        errors.user = 'This field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}
