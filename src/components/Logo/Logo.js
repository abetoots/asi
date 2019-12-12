import React from 'react';
import './Logo.scss';

import logo from '../../assets/images/asi-icon.svg';

const Logo = (props) => (
    <div className="Logo">
        <img className="Logo__img" src={logo} alt="ASI Logo" />
    </div>
);

export default Logo;