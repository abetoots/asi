import React, { Component } from 'react';
import './Auth.scss';

//Firebase drop-in sign-in ui
import { startUI, getUIConfig, authService } from '../../firebase-init';
import 'firebaseui/dist/firebaseui.css';

//Redux
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { Redirect } from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner1';
import Aux from '../../hoc/Auxiliary';

//Type check
import PropTypes from 'prop-types'


class Auth extends Component {

    componentDidMount() {
        if (!this.props.signedIn) {
            startUI('.Auth__firebaseContainer', getUIConfig());
        }
    }

    render() {
        return (
            <div className="Auth">
                {this.props.signedIn ?
                    <h1 className="Auth__heading -animateUp">Welcome {authService.currentUser.displayName} !</h1>
                    :
                    <Aux>
                        <h1 className="Auth__heading">Log In To Your Account</h1>
                        <div className="Auth__firebaseContainer"></div>
                    </Aux>
                }

            </div>
        );
    }
};

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