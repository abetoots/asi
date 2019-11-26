import React from 'react';
import './Search.scss';
import PropTypes from 'prop-types';


const Search = (props) => {
    let searchClasses = ['Search'];
    let inputClasses = ['Search__input'];
    let buttonClasses = ['Search__button'];
    let btnTextClasess = ['Search__btnText'];

    if (props.variant) {
        inputClasses.push(`-${props.variant}`);
        searchClasses.push(`-${props.variant}`);
        buttonClasses.push(`-${props.variant}`);
        btnTextClasess.push(`-${props.variant}`);
    }

    if (props.icon) {
        inputClasses.push(`-withIcon`);
        searchClasses.push(`-withIcon`);
        buttonClasses.push(`-withIcon`);
        btnTextClasess.push(`-withIcon`);
    }

    if (props.btnPos) {
        buttonClasses.push(`-absolute`);
        buttonClasses.push(`-${props.btnPos}`);
    }

    if (props.touched) {
        searchClasses.push('-touched');
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

    let results = '';
    if (props.enableAutoResults) {
        if (props.results.length > 0) {
            results =
                <div className="Search__autoResults">
                    <ul>
                        {props.results.map(result => <li key={result.result} onClick={(e) => props.handleResultClick(e, result)}>{result.result}</li>)}
                    </ul>
                </div>;
        }
    }

    let tooltip = '';
    if (props.tooltip) {
        tooltip = <span className="Search__tooltip">{props.tooltip}</span>;
    }


    return (
        <form className={searchClasses.join(' ')} onSubmit={props.handleSubmit}>
            <label className={`Search__label ${props.labelHidden ? '-hidden' : ''}`}>{props.label}</label>
            <input
                className={inputClasses.join(' ')}
                onChange={props.handleChange}
                placeholder={props.placeholder}
                onFocus={focusHandler}
                onBlur={focusHandler}
            />
            {tooltip}
            {results}
            <button className={buttonClasses.join(' ')} type="submit">
                {props.icon ? <div className="Search__icon">{props.icon}</div> : ''}
                <span className={btnTextClasess.join(' ')}>{props.btnText}</span>
            </button>
        </form>
    );
};

Search.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    btnText: PropTypes.string.isRequired,
    variant: PropTypes.string,
    btnPos: PropTypes.string,
    icon: PropTypes.element,
    results: PropTypes.array,
    absolute: PropTypes.bool,
    tooltip: PropTypes.string,
    labelHidden: PropTypes.bool,
    handleResultClick: PropTypes.func,
    handleSubmit: PropTypes.func,
    enableAutoResults: PropTypes.bool,
    touched: PropTypes.bool
}

export default Search;