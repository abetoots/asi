import React from 'react';
import './Input.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
    let inputElement = null;
    //add invalid css class 'invalid' when invalid for better ux
    const inputClasses = ['Input__inputEl'];
    if (!props.valid && props.touched && props.shouldValidate) {
        inputClasses.push('-invalid');
    }

    const focusHandler = (event) => {
        if (event.type === 'focus') {
            event.target.classList.add('-focused');
            event.target.parentElement.classList.add('-focused');
        } else {
            event.target.classList.remove('-focused');
            event.target.parentElement.classList.remove('-focused');
        }
    }

    //When button is clicked, trigger the click on <input type="file">
    const fileInputEl = useRef(null);
    const fileBtnHandler = (event) => {
        fileInputEl.current.click();
    }

    //switch case for normal inputs
    if (props.elementType) {
        switch (props.elementType) {
            case ('input'):
                if (props.elementConfig.type === 'file') {
                    inputElement = (
                        <div className="Input__file">
                            <button className="Input__fileBtn" type="button" onClick={fileBtnHandler}>{props.customProps.btnText}</button>
                            <div className="Input__filePreview">
                                <img className="Input__img" src={props.value.url && !props.value.touched ? props.value.url : props.value.preview} />
                            </div>
                            <input
                                className={inputClasses.join(' ')}
                                {...props.elementConfig}
                                onChange={props.handleChange}
                                ref={fileInputEl} />
                        </div>
                    );
                } else {
                    inputElement = <input
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.handleChange}
                        onFocus={focusHandler}
                        onBlur={focusHandler} />;
                }
                break;
            case ('textarea'):
                inputElement = <textarea
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.handleChange}
                    onFocus={focusHandler}
                    onBlur={focusHandler} />;
                break;
            case ('select'):
                inputElement =
                    <select
                        className={inputClasses.join(' ')}
                        value={props.value}
                        onChange={props.handleChange}
                        onFocus={focusHandler}
                        onBlur={focusHandler}>
                        {props.elementConfig.options.map(option => (
                            <option
                                key={option}
                                value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                break;
            case ('checkbox'):
                inputElement =
                    <ul className="Input__ul">
                        {props.elementConfig.options.map(item => {
                            return (
                                <li key={item} className="Input__checkboxLi">
                                    <input
                                        id={item}
                                        className="Input__checkboxInput"
                                        type="checkbox"
                                        value={item}
                                        checked={props.value.includes(item)}
                                        onChange={props.handleChange}
                                        onFocus={focusHandler}
                                        onBlur={focusHandler}
                                    />
                                    <label htmlFor={item}>{item}</label>
                                </li>
                            );

                        })}
                    </ul>
                break;

            case ('editor'):
                inputElement = props.children;
                break;

            default:
                inputElement = <input
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.handleChange}
                    onFocus={focusHandler}
                    onBlur={focusHandler} />;
        }
    } // end switch case for normal inputs
    return (
        <div className="Input">
            <label className="Input__label">{props.label} {props.customProps.icon && !props.customProps.insideInput ? <FontAwesomeIcon className="Input__icon" icon={props.customProps.icon} /> : ''}</label>
            <div className={`Input__slot -relative ${props.customProps.insideInput ? ' -withIcon' : ''} `}>
                {inputElement}
                {props.customProps.icon && props.customProps.insideInput ? <FontAwesomeIcon className="Input__icon -insideInput" icon={props.customProps.icon} /> : ''}
                {props.elementConfig.type !== 'file' ? <div className="Input__line"></div> : ''}
            </div>
        </div>
    );
};

Input.propTypes = {
    elementType: PropTypes.string.isRequired,
    elementConfig: PropTypes.shape({
        type: PropTypes.string,
        required: PropTypes.bool,
        options: PropTypes.array
    }),
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    valid: PropTypes.bool,
    touched: PropTypes.bool,
    shouldValidate: PropTypes.bool,
    customProps: PropTypes.object,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
    children: PropTypes.elementType
}

export default Input;