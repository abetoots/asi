import React, { useState, useRef } from 'react';
import './Header.scss';

import { connect } from 'react-redux';

//Components
import Logo from '../../components/Logo/Logo';
import Menu from '../../components/Menu/Menu';
import BurgerMenu from '../../components/UI/BurgerMenu/BurgerMenu';
import MobileWrapper from '../../components/MobileWrapper/MobileWrapper';
import { NavLink } from 'react-router-dom';

//misc
import { defaultMenu, authenticatedMenu } from '../../misc/shared/menus';
import PropTypes from 'prop-types';


const Header = props => {
    const [mobileTriggered, setMobileTriggered] = useState(false);

    const targetMobileEl = useRef(null);
    const targetChildEl = targetMobileEl.current !== null ? targetMobileEl.current.firstElementChild : null;

    const linklist = props.signedIn ? authenticatedMenu : defaultMenu;

    let height = 0;
    if (targetChildEl) {
        // height = parseFloat(getComputedStyles(targetChildEl, null).height);
        height = parseFloat(targetChildEl.getBoundingClientRect().height);
    }

    const mobileClickHandler = e => {
        if (parseFloat(targetMobileEl.current.style.height) > 0) {
            targetMobileEl.current.style.height = 0;
        } else {
            targetMobileEl.current.style.height = `${height}px`;
        }

        setMobileTriggered(prev => !prev);
    }
    return (
        <section>
            <header className="Header">
                <div className="Header__slot -logo">
                    <NavLink to='/' className="Header__link">
                        <Logo />
                    </NavLink>
                </div>
                <div className="Header__slot">
                    <Menu linklist={linklist} desktopOnly horizontal />
                </div>
                <div className="Header__slot">
                    <MobileWrapper>
                        <BurgerMenu handleClick={mobileClickHandler} toggled={mobileTriggered} />
                    </MobileWrapper>
                </div>
            </header>
            <MobileWrapper>
                <div ref={targetMobileEl} className="Header__mobileTarget">
                    <div className="Header__subSlot -mobileMenu">
                        <Menu linklist={linklist} />
                    </div>
                </div>
            </MobileWrapper>
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