import React, { Component } from 'react';
import './Footer.scss';

import Menu from '../../components/Menu/Menu';
import Logo from '../../components/Logo/Logo';
import FAIcons from '../../components/FAIcons/FAIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { footerMenu1, footerMenu2 } from '../../misc/shared/menus';

export class Footer extends Component {

    render() {
        const now = new Date().getFullYear();
        return (
            <section>
                <footer className="Footer">
                    <div className="Footer__slot">
                        <Logo />
                        <FAIcons>
                            <FontAwesomeIcon icon={['fab', 'facebook']} size='2x' />
                            <FontAwesomeIcon icon={['fab', 'pinterest']} size='2x' />
                            <FontAwesomeIcon icon={['fab', 'twitter']} size='2x' />
                        </FAIcons>
                    </div>
                    <div className="Footer__slot -center">
                        <Menu linklist={footerMenu1} label="ASI" />
                    </div>
                    <div className="Footer__slot -center">
                        <Menu linklist={footerMenu2} label="About" />
                    </div>
                    {/* <LogoWithContactInfo />
                    <Menu />
                    <NewsLetter />
                    <FooterBar /> */}
                    <div className="Footer__slot -bottomBar">
                        <small>
                            Copyright &copy; {now} <span style={{ textTransform: 'uppercase' }}>ASI</span>. All Rights Reserved.
                        </small>
                    </div>
                </footer>
            </section>
        );
    }
}

export default Footer;