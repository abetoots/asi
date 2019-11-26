import React from 'react';
import './MobileWrapper.scss';

const MobileWrapper = (props) => (
    <div className="MobileWrapper">
        {// eslint-disable-next-line react/prop-types 
            props.children
        }
    </div>
);

export default MobileWrapper;