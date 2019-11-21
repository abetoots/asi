import React from 'react';
import './BurgerMenu.scss';

const BurgerMenu = (props) => (
    <button className="BurgerMenu" onClick={props.clicked}>
        <div className="BurgerMenu__bar -one"></div>
        <div className="BurgerMenu__bar -two"></div>
        <div className="BurgerMenu__bar -three"></div>
        <span className="BurgerMenu__label">Menu</span>
    </button>
);

export default BurgerMenu;