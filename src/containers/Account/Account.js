import React, { Component } from 'react';
import './Account.scss';
//To edit the form, edit the json-like object imported from shared/forms
import { accountForm } from '../../misc/shared/forms';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Form from '../../components/Form/Form';
import Input from '../../components/UI/Input/Input';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/plugins/char_counter.min.js';
import Spinner3 from '../../components/UI/Spinner/Spinner3';

import * as actions from '../../store/actions/index';

import PropTypes from 'prop-types';


import {
    imageRef,
    taskEvent,
    vendorsRef,
    firebaseApp,
    handleStateChange,
    handleUploadCompletion,
    handleUploadError
} from '../../firebase-init';

class Account extends Component {
    state = {
        name: '',
        businessName: '',
        category: '',
        location: '',
        phoneNum: '',
        telNum: '',
        website: '',
        description: '',
        profilePhoto: {
            file: {}, //for upload
            preview: '', // for previewing,
            url: '', // for previewing
            touched: false
        },
    };

    componentDidMount() {
        console.log('mounted', '[account]')
        //retrieve account
        if (this.props.signedIn && !this.props.loadedAccount) {
            this.props.retrieveAccount();
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.account !== 'empty') {
            if (!prevProps.loadedAccount && this.props.loadedAccount) {
                console.log('map loaded account data to state', '[Account]');
                //Only update the state if user has an account, 
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring
                //Destructure, get the account without the profilePhoto
                const { profilePhoto, ...account } = this.props.account;
                account.profilePhoto = { ...this.state.profilePhoto, url: profilePhoto };
                this.setState({ ...account });
            }
        }
    }

    handleModelChange = model => {
        this.setState({
            description: model
        });
    }

    submitHandler = (e) => {
        e.preventDefault();

        const user = firebaseApp.auth().currentUser;
        //Destructure, get the data without the profilePhoto
        const { profilePhoto, ...formData } = this.state;

        //If a profilePhoto has been set
        if (this.state.profilePhoto.file.constructor === File) {
            let file = this.state.profilePhoto.file;
            //imageRef is a reference to '/images'. Uploads will be uploaded to that directory
            let fileName = this.state.businessName;
            fileName.toLowerCase().replace(' ', '-').trim();
            let ref = imageRef.child(`${fileName}-profile-photo.jpg`);

            //Upload the file
            //https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask.html
            const uploadTask = ref.put(file);
            // Register three observers:
            const subscribe = uploadTask.on(taskEvent.STATE_CHANGED);
            subscribe(handleStateChange, handleUploadError, (formData) => handleUploadCompletion(formData));

        } else { // no profilePhoto, skip upload.

            // Data can now be added to Cloud Firestore
            vendorsRef.doc(user.uid).set(formData)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    inputChangedHandler = (e, identifier) => {
        e.preventDefault();

        //Handle input type 'file' cases
        if (e.target.type === 'file') {
            //Return when user doesn't select anything
            if (e.target.files.length == 0) {
                return;
            }

            let file = e.target.files[0];
            //Create a copy, set the new values
            let copy = { ...this.state.profilePhoto, file: file, preview: URL.createObjectURL(file), touched: true };
            //If previously set
            if (this.state.profilePhoto.preview) {
                //Avoid memory issues by revoking the previous objecUrl created
                // This dangerously mutates state though, but it's okay since we're not hoping for a rerender anyway
                URL.revokeObjectURL(this.state.profilePhoto.preview);
                this.setState({ [identifier]: copy });
            } else {
                this.setState({ [identifier]: copy });
            }
        } else {
            this.setState({ [identifier]: e.target.value });
        }
    }

    render() {
        console.log('Rendered', '[Account]');

        //Component to render if loading account encounters errors
        const notLoaded = this.props.errorAccount ?
            <div>{this.props.errorAccount} ⚠️</div>
            :
            <Spinner3 />;

        return (
            <div className="Account">
                {!this.props.signedIn ? <Redirect to="/" /> : ''}
                {this.props.loadedAccount ?
                    <div className="Account__slot -form">
                        <h1>Account Settings</h1>
                        <Form handleSubmit={this.submitHandler} btnText='Save'>
                            {accountForm.map(item =>
                                <Input
                                    key={item.key}
                                    elementType={item.elementType}
                                    elementConfig={item.elementConfig}
                                    label={item.label}
                                    value={this.state[item.key]}
                                    handleChange={(event) => this.inputChangedHandler(event, item.key)}
                                    customProps={item.customProps}
                                >
                                    <FroalaEditor
                                        model={this.state.description}
                                        onModelChange={this.handleModelChange}
                                        config={{
                                            charCounterCount: true,
                                            charCounterMax: 2000,
                                            width: '100%',
                                            heightMin: 200
                                        }}
                                    />
                                </Input>
                            )}
                        </Form>
                    </div>
                    :
                    notLoaded
                }

            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        signedIn: state.user.signedIn,
        account: state.account.account,
        loadedAccount: state.account.loaded,
        errorAccount: state.account.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        retrieveAccount: () => dispatch(actions.retrieveAccount())
    }
}

Account.propTypes = {
    signedIn: PropTypes.bool,
    account: PropTypes.object,
    loadedAccount: PropTypes.bool,
    errorAccount: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);