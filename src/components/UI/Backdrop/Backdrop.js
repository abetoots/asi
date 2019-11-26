import React from 'react';
import './Backdrop.css';
import PropTypes from 'prop-types';


const Backdrop = (props) => (
    props.show ? <div className="Backdrop" onClick={props.handleClick}></div> : null
);

Backdrop.propTypes = {
    show: PropTypes.bool,
    handleClick: PropTypes.func
}
export default Backdrop;