import React from 'react';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

import './Hero.scss';
import hero from '../../assets/opportunity-original.jpg';
import heroTablet from '../../assets/opportunity-tablet.jpg';
import heroMobile from '../../assets/opportunity-mobile.jpg';

const Hero = (props) => {
    return (
        <div className="Hero">
            <div className="Hero__overlay">
                <ResponsiveImage
                    class='Hero__img'
                    alt='The hero image for the website'
                    src={hero}
                    srcMobile={heroMobile}
                    srcTablet={heroTablet}
                />
            </div>

            <div className="Hero__content">
                <h1>Sample Content</h1>
            </div>
        </div>
    );
}

export default Hero;