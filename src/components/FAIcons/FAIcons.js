import React from 'react';
import './FAIcons.scss';

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

export default FAIcons;