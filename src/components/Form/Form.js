import React from 'react';
import './Form.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const Form = (props) => {
    let statusUi = '';
    if (props.submitted) {
        statusUi = <div className="Form__status -success">Success ✅ </div>
    } else if (props.submitError) {
        statusUi = <div className="Form__status -error">{props.submitError} ❌</div>
    }
    return (
        <form className="Form" onSubmit={props.handleSubmit}>
            {
                // eslint-disable-next-line react/prop-types
                props.children
            }
            <button className="Form__submitBtn" disabled={props.submitting} type="submit">
                {props.submitting ?
                    <FontAwesomeIcon icon="spinner" spin />
                    : props.btnText}
            </button>
            {statusUi}
        </form>
    );
};

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitError: PropTypes.string,
    submitted: PropTypes.bool,
    submitting: PropTypes.bool,
    btnText: PropTypes.string.isRequired
}

export default Form;