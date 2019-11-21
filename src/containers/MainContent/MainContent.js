import React, { Component } from 'react';
import './MainContent.scss';
import { withRouter } from 'react-router-dom';



class MainContent extends Component {
    componentDidMount() {
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
};

export default withRouter(MainContent);