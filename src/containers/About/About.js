import React, { Component } from 'react';
import './About.scss';

import TextImage from '../../components/TextImage/TextImage';

import purposeMobile from '../../assets/images/asi-purpose-mobile.jpg'
import purposeTablet from '../../assets/images/asi-purpose-tablet.jpg';
import purpose from '../../assets/images/asi-purpose-original.jpg';

import oppMobile from '../../assets/images/opportunity-mobile.jpg';
import oppTablet from '../../assets/images/opportunity-tablet.jpg';
import opp from '../../assets/images/opportunity-original.jpg';

import stratMobile from '../../assets/images/strategy-mobile.jpg';
import stratTablet from '../../assets/images/strategy-tablet.jpg';
import strat from '../../assets/images/strategy-original.jpg';

class About extends Component {

    render() {
        return (
            <div className="About">
                <div className="About__slot -head">
                    <h2 className="About__heading">Adventist Laymen's Services & Industries</h2>
                    <p className="About__text -head">ASI is a Seventh-day Adventist organization that connects supporting ministries, businesses, and
                        professionals who are responding to the call of
                        God to actively share Christ’s love and hope with
                    the world.</p>
                </div>
                <div className="About__slot -textimages">
                    <TextImage src={purpose} srcMobile={purposeMobile} srcTablet={purposeTablet} alt="Image representing ASI's purpose" right>
                        <h3>Purpose</h3>
                        <p>The purpose of ASI is to connect and equip lay
                            ministries, business people, and professionals
                            and their families to regularly and passionately
                        share Christ in the marketplace.
                        <br />
                            <br />
                            Thus, actively
                                    supporting the Adventist Church’s mission of
                                    sharing the Three Angels’ Messages of God’s
                                    love and grace to the world in preparation for
                        His soon return.
                        </p>
                    </TextImage>
                    <TextImage src={opp} srcMobile={oppMobile} srcTablet={oppTablet} alt="Image representing ASI's opportunity" left>
                        <h3>The Opportunity</h3>
                        <p>Imagine what could happen if every single
                            Seventh-day Adventist business, professional
                            and ministry leader was 100% engaged in
                            helping to accomplish the mission of the
                            Church!
                            <br />
                            <br />
                            Imagine the tremendous impact we
                            could make for God’s kingdom! Together we
                            can make a difference. Join us in committing to
                            becoming actively involved in mission.
                        </p>
                    </TextImage>
                    <TextImage src={strat} srcMobile={stratMobile} srcTablet={stratTablet} alt="Image representing ASI's opportunity" right>
                        <h3>Strategy</h3>
                        <p>ASI embraces three strategies critical to
                            accomplishing our mission.
                        </p>
                        <br />
                        <br />
                        <ul>
                            <li>
                                We plan compelling, memorable, and
                                engaging ASI Conventions that inspire attendees with stories of how the gospel
                                changes lives.
                                    </li>
                            <br />
                            <li>
                                We fulfill Christ’s mission in a collaborative,
                                innovative, and communicative way.
                                    </li>
                            <br />
                            <li>
                                We strengthen and increase membership
                                while mentoring and equipping future
                                leaders.
                                    </li>
                        </ul>
                    </TextImage>
                </div>
                <div className="About__slot -history">
                    <h3 className="About__heading">History 📖</h3>
                    <p className="About__text -history">
                        ASI was founded in 1947 as a department of the
                        General Conference.
                        <br />
                        <br />
                        At that time, there was a
                        need for greater coordination and collaboration
                        in mission work as lay people who had been trained at Madison College started businesses
                        and ministries, founded churches, schools,
                        sanitariums and hospitals, and advanced the
                        mission of the Seventh-day Adventist Church
                        across the Southern United States and around
                        the world.
                        <br />
                        <br />
                        In 1985 when the North American
                        Division was formed, ASI became one of its
                        departments. The General Conference has
                        encouraged each Division to develop an ASI
                        Department.
                        <br />
                        <br />
                        Ellen White often appealed
                        for self-supporting missionaries to enter the
                        unworked areas at their own expense and bring
                        the Three Angels’ Messages to those in need.
                        <br />
                        <br />
                        Originally made up of only supporting ministry
                        leaders, ASI now incorporates business owners
                        and professionals alongside supporting ministry
                        leaders and is focusing efforts on the next
                        generation of business and ministry leaders
                        through the ASI Young Professionals program.
                    </p>
                </div>
            </div>
        );

    }
}

export default About;