import React from 'react';
import './Hero.scss';

import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

import PropTypes from 'prop-types'

const Hero = (props) => {
    return (
        <div className={`Hero ${props.classModifier}`}>
            <div className="Hero__overlay">
                <ResponsiveImage
                    class='Hero__img'
                    alt='The hero image for the website'
                    src={props.src}
                    srcMobile={props.srcMobile}
                    srcTablet={props.srcTablet}
                />
            </div>

            <div className="Hero__content">
                {props.children}
            </div>
        </div>
    );
}

Hero.propTypes = {
    classModifier: PropTypes.string,
    src: PropTypes.string,
    srcMobile: PropTypes.string,
    srcTablet: PropTypes.string,
    children: PropTypes.elementType
}

export default Hero;