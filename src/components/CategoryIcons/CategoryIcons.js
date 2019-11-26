import React from 'react';
import './CategoryIcons.scss';

import PropTypes from 'prop-types';


const CategoryIcons = (props) => (
    <div className="CategoryIcons">
        {props.categories.map(item =>
            <div className="CategoryIcons__slot" key={item.category}>
                <button className="CategoryIcons__button">
                    <img className="CategoryIcons__image" src={item.src} />
                    <h4 className="CategoryIcons__category">{item.category}</h4>
                </button>
            </div>
        )}

    </div>
);

CategoryIcons.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default CategoryIcons;