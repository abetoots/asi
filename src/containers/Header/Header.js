import React, { useState, useRef } from 'react';
import './Header.scss';

import { connect } from 'react-redux';

//Components
import Logo from '../../components/Logo/Logo';
import Menu from '../../components/Menu/Menu';
import BurgerMenu from '../../components/UI/BurgerMenu/BurgerMenu';
import { NavLink } from 'react-router-dom';

//misc
import { defaultMenu, authenticatedMenu } from '../../misc/shared/menus';
import PropTypes from 'prop-types';
import MobileWrapper from '../../components/MobileWrapper/MobileWrapper';


export const Header = props => {
    const [menuToggled, setMenuToggled] = useState(false);

    const targetElToDisplay = useRef(null);

    const linklist = props.signedIn ? authenticatedMenu : defaultMenu;

    const menuClickHandler = e => {
        if (targetElToDisplay === null) {
            console.log('target not found');
            return;
        }
        let wrapperHeight = targetElToDisplay.current.querySelector('.MainHeader__subSlot.-burgerMenu').getBoundingClientRect().height;
        let targetheight = targetElToDisplay.current.clientHeight;
        if (targetheight > 0) {
            targetElToDisplay.current.style.height = 0;
            targetElToDisplay.current.style.visibility = 'hidden';
        } else {
            targetElToDisplay.current.style.height = `${wrapperHeight}px`;
            targetElToDisplay.current.style.visibility = 'initial';
        }

        setMenuToggled(prev => !prev);
    }
    return (
        <section className="MainHeader">
            <header className="Header">
                <div className="Header__slot">
                    <BurgerMenu handleClick={menuClickHandler} toggled={menuToggled} />
                </div>
                <div className="Header__slot -logo">
                    <NavLink to='/' className="Header__link">
                        <Logo />
                    </NavLink>
                </div>
                {
                    !props.signedIn ?
                        <div className="Header__slot -register">
                            <MobileWrapper>
                                <NavLink to="/login" className="Header__btnRegister" >Register</NavLink>
                            </MobileWrapper>
                        </div>
                        :
                        ''
                }

            </header>
            <div ref={targetElToDisplay} className="MainHeader__slot -menuClickTarget">
                <div className="MainHeader__subSlot -burgerMenu">
                    <Menu linklist={linklist} visible={menuToggled} />
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = state => {
    return {
        signedIn: state.user.signedIn
    }
}

Header.propTypes = {
    signedIn: PropTypes.bool
}

export default connect(mapStateToProps)(Header);