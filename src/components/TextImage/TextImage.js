import React from 'react';
import './TextImage.scss';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';
import PropTypes from 'prop-types';


const TextImage = (props) => {
    if (props.left && props.right) {
        return new Error('Can\'t take both left and right as props ')
    }
    let classNames = ['TextImage__img'];
    if (props.left) {
        classNames.push('-left')
    } else if (props.right) {
        classNames.push('-right')
    }

    let img = <ResponsiveImage
        class={classNames.join(' ')}
        alt={props.alt}
        src={props.src}
        srcMobile={props.srcMobile}
        srcTablet={props.srcTablet}
    />
    return (
        <div className="TextImage">
            {props.left ? img : ''}
            <div className="TextImage__text">{props.children}</div>
            {props.right ? img : ''}
        </div>
    );
}

TextImage.propTypes = {
    left: PropTypes.bool,
    right: PropTypes.bool,
    alt: PropTypes.string,
    src: PropTypes.string,
    srcMobile: PropTypes.string,
    srcTablet: PropTypes.string,
    children: PropTypes.elementType
}
export default TextImage;