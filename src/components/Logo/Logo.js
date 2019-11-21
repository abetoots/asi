import React from 'react';
import './Logo.scss';

import logo from '../../assets/logo.svg';

const Logo = (props) => (
    <div className="Logo">
        <img className="Logo__img" src={logo} alt="ASI Logo" />
        <div className="Logo__text">ASI</div>
    </div>
);

export default Logo;