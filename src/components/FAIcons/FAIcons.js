import React from 'react';
import './FAIcons.scss';

import PropTypes from 'prop-types';


const FAIcons = (props) => (
    <div className="FAIcons">
        <ul className="FAIcons__ul">
            {props.children.map((child, index) =>
                <li key={child.type.displayName + index} className="FAIcons__li">
                    {child}
                </li>
            )}
        </ul>

    </div>
);

FAIcons.propTypes = {
    children: PropTypes.array
}

export default FAIcons;