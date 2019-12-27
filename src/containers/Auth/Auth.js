import React, { Component } from 'react';
import './Auth.scss';

//Firebase drop-in sign-in ui
import { startUI, getUIConfig, authService } from '../../firebase-init';
import 'firebaseui/dist/firebaseui.css';

//Redux
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import { Link } from 'react-router-dom';

//Type check
import PropTypes from 'prop-types'


class Auth extends Component {

    componentDidMount() {
        console.log('mounted', '[Auth]');
        if (!this.props.signedIn) {
            console.log('start ui');
            startUI('.Auth__firebaseContainer', getUIConfig());
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('updated', '[Auth]');

    }


    render() {
        console.log('rendered', '[Auth]');

        return (
            <div className="Auth">
                {this.props.signedIn ?
                    <Aux>
                        <h1 className="Auth__heading -animateUp">Welcome {authService.currentUser.displayName} !</h1>
                        <Link to="/account" className="Auth__link -animateUp">Edit your Account</Link>
                    </Aux>
                    :
                    <Aux>
                        <h1 className="Auth__heading">Create an account / Sign In:</h1>
                        <div className="Auth__firebaseContainer"></div>
                    </Aux>
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        signedIn: state.user.signedIn,
        pending: state.user.pending
    }
}


Auth.propTypes = {
    signedIn: PropTypes.bool,
}

export default connect(mapStateToProps)(Auth);