import React from 'react';
import PropTypes from 'prop-types';

import './ResponsiveImage.scss';

const ResponsiveImage = (props) => {
    const srcset = `${props.srcMobile} 320w, ${props.srcTablet} 800w, ${props.src} 1440w`;
    //The browser ignores everything after the first matching condition
    const size = `(max-width: 400px) 320px, (max-width: 800px) 800px, 1440px`;


    return (
        <img className={props.class} src={props.src} srcSet={srcset} sizes={size} alt={props.alt} />
    );

}

ResponsiveImage.propTypes = {
    srcMobile: PropTypes.string.isRequired,
    srcTablet: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    class: PropTypes.string
}


export default ResponsiveImage;