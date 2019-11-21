import React from 'react';
import PropTypes from 'prop-types'

import './Form.scss';

const Form = (props) => {
    return (
        <form className="Form" onSubmit={props.handleSubmit}>
            {props.children}
            <button className="Form__submitBtn" type="submit">{props.btnText}</button>
        </form>
    );
};

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired
}

export default Form;