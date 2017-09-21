import Validator from 'validator';
import _ from 'lodash';
import i18n from '../../services/language/i18n'
import { translate, Interpolate, Trans } from 'react-i18next'

export default function validateInput(data, t) {
    let errors = {};

    if (Validator.isEmpty(data.user)) {
        errors.user = t('login:error_input');
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = t('login:error_input');
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}
