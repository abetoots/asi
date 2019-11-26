import React, { Component } from 'react';
import './MainContent.scss';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

class MainContent extends Component {
    componentDidMount() {
        // eslint-disable-next-line react/prop-types
        this.props.history.listen((location, action) => {
            // console.log(location);
            // console.log(action);
        })
    }

    render() {
        return (
            <section>
                <main className="MainContent">
                    {this.props.children}
                </main>
            </section>
        );
    }
}

MainContent.propTypes = {
    children: PropTypes.element
}

export default withRouter(MainContent);