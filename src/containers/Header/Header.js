import React, { Component } from 'react';
import './Header.scss';

import { connect } from 'react-redux';

//Components
import Logo from '../../components/Logo/Logo';
import Menu from '../../components/Menu/Menu';
import BurgerMenu from '../../components/UI/BurgerMenu/BurgerMenu';
import { NavLink } from 'react-router-dom';

import { defaultMenu, authenticatedMenu } from '../../misc/shared/menus';

class Header extends Component {

    mobileMenuClickedHandler = () => {

    }

    render() {
        const linklist = this.props.signedIn ? authenticatedMenu : defaultMenu;
        return (
            <section>
                <header className="Header">
                    <div className="Header__slot">
                        <NavLink to='/'>
                            <Logo />
                        </NavLink>
                    </div>
                    <div className="Header__slot">
                        <Menu linklist={linklist} desktopOnly horizontal />
                    </div>
                    <div className="Header__slot">
                        <BurgerMenu />
                    </div>
                </header>
                {/* <MobileNav/> */}
            </section>
        );
    }
};

const mapStateToProps = state => {
    return {
        signedIn: state.user.signedIn
    }
}

export default connect(mapStateToProps)(Header);