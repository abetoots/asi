import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../firebase-init';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
    logOut();

    return (
        <div>
            {!props.signedIn ? <Redirect to="/" /> : ''}
        </div>
    );
}
const mapStateToProps = state => {
    return {
        signedIn: state.user.signedIn
    }
}

export default connect(mapStateToProps)(Logout);