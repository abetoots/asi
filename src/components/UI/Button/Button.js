import React from 'react';
import './Button.scss'
const Button = (props) => (
    <button
        className={["Button", props.btnType, props.btnSize].join(' ')}
        onClick={props.clicked}
        disabled={props.disabled}>{props.children}</button>
);

export default Button;