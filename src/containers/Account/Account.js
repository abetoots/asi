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

class Account extends Component {
    state = {
        name: '',
        businessName: '',
        categories: [],
        location: {
            street: '',
            city: '',
            province: '',
            country: ''
        },
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
        loadedData: false
    };

    componentDidMount() {
        console.log('mounted', '[account]')
        //if mounted for the first time, retrieve account 
        if (this.props.signedIn && !this.props.loadedAccount) {
            this.props.retrieveAccount();
        } else if (this.props.loadedAccount) {
            //if already loaded, just re assign the state;
            const copy = { ...this.props.account };
            this.setState({ ...copy, loadedData: true })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.account !== 'empty') {
            if (!prevProps.loadedAccount && this.props.loadedAccount) {
                console.log('map loaded account data to state', '[Account]');
                const copy = { ...this.props.account };
                console.log(copy);
                this.setState({ ...copy, loadedData: true });
                //TODO handle sync of data
                //Problem: Whenever we add additional data to our state, we have to manually update the account
                // if not , we get old data that does not match with our current state structure
                // The setState above will then cause errors and bugs
                // this.setState({ loadedData: true })
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
        //Destructure, get the data without the profilePhoto and loadedData
        // eslint-disable-next-line no-unused-vars
        const { profilePhoto, loadedData, ...formData } = this.state;
        let upload = false;
        let fileObj = {};

        //If a profilePhoto has been set,
        if (this.state.profilePhoto.file.constructor === File) {
            upload = true;
            fileObj.file = this.state.profilePhoto.file;
            //replace any slash and space
            fileObj.fileName = this.props.uid;
        }

        formData.profilePhoto = this.state.profilePhoto.url;

        this.props.updateAccount(formData, upload, fileObj)

    }

    inputChangedHandler = (e, identifier) => {

        //Handle input type 'file' cases
        if (e.target.type === 'file') {
            //Return when user doesn't select anything
            if (e.target.files.length == 0) {
                return;
            }

            let file = e.target.files[0];
            //Create a copy, set the new values
            let copy = { ...this.state[identifier], file: file, preview: URL.createObjectURL(file), touched: true };
            //If previously set
            if (this.state[identifier].preview) {
                //Avoid memory issues by revoking the previous objecUrl created
                // This dangerously mutates state though, but it's okay since we're not hoping for a rerender anyway
                URL.revokeObjectURL(this.state[identifier].preview);
                this.setState({ [identifier]: copy });
            } else {
                this.setState({ [identifier]: copy });
            }
        } else if (e.target.type === 'checkbox') {
            //make a copy, do not alter state directly
            let copy = [...this.state[identifier]];
            //if checkbox is about to be checked
            if (e.target.checked) {
                //add the new value
                copy.push(e.target.value);
                this.setState({ [identifier]: copy });
            } else {
                //if checkbox is about to be unchecked, we also want to remove that value from state
                //filter and return all the elements
                let filtered = copy.filter(val => val !== e.target.value);
                this.setState({ [identifier]: filtered });
            }
        } else {
            this.setState({ [identifier]: e.target.value });
        }
    }

    multiInputChangedHandler = (e, parentKey, targetKey) => {
        //copy the parent object
        const copyParent = { ...this.state[parentKey] };

        //TODO handle multiline input more elegantly. DRY principle
        //TODO done, copy how we did it at filter controls
        //Handle input type 'file' cases
        if (e.target.type === 'file') {
            //Return when user doesn't select anything
            if (e.target.files.length == 0) {
                return;
            }

            let file = e.target.files[0];
            //Create a copy, set the new values
            let targetCopy = { ...this.state[parentKey][targetKey], file: file, preview: URL.createObjectURL(file), touched: true };
            copyParent[targetKey] = targetCopy;
            //If previously set
            if (this.state[parentKey][targetKey].preview) {
                //Avoid memory issues by revoking the previous objecUrl created
                // This dangerously mutates state though, but it's okay since we're not hoping for a rerender anyway
                URL.revokeObjectURL(this.state[parentKey][targetKey].preview);

                this.setState({ [parentKey]: copyParent });
            } else {
                this.setState({ [parentKey]: copyParent });
            }
        } else if (e.target.type === 'checkbox') {
            //make a copy, do not alter state directly
            let targetCopy = [...this.state[parentKey][targetKey]];
            //if checkbox is about to be checked
            if (e.target.checked) {
                //add the new value
                targetCopy.push(e.target.value);
                copyParent[targetKey] = targetCopy;
                this.setState({ [parentKey]: copyParent });
            } else {
                //if checkbox is about to be unchecked, we also want to remove that value from state
                //filter and return all the elements
                let filtered = targetCopy.filter(val => val !== e.target.value);
                copyParent[targetKey] = filtered;
                this.setState({ [parentKey]: copyParent });
            }
        } else {
            copyParent[targetKey] = e.target.value;
            this.setState({ [parentKey]: copyParent });
        }

    }

    render() {
        console.log('Rendered', '[Account]');

        //Component to render if loading account encounters errors
        const notLoaded = this.props.errorAccount ?
            <div>{this.props.errorAccount} ⚠️</div>
            : <Spinner3 />
            ;

        // TODO Handle synchronizing of state whenever we change it here and in Firestore schema
        // TODO Problem: Whenever we add inputs, we need to synchronize the old data as well to contain the new fields
        return (
            <div className="Account">
                {!this.props.signedIn ? <Redirect to="/" /> : ''}
                {this.props.loadedAccount ?
                    <div className="Account__slot -form">
                        <h1>Account Settings</h1>
                        <Form
                            handleSubmit={this.submitHandler}
                            btnText='Save'
                            submitting={this.props.updating}
                            submitted={this.props.updated}
                            submitError={this.props.errorUpdate}
                        >
                            {accountForm.map(item => {
                                if (item.multiLine) {
                                    return item.inputs.map(input => {
                                        return (
                                            <Input
                                                key={input.key}
                                                elementType={input.elementType}
                                                elementConfig={input.elementConfig}
                                                label={input.label}
                                                value={this.state[item.parentKey][input.key]}
                                                handleChange={(event) => this.multiInputChangedHandler(event, item.parentKey, input.key)}
                                                customProps={input.customProps}
                                            >
                                                {this.state.loadedData ?
                                                    <FroalaEditor
                                                        model={this.state.description}
                                                        onModelChange={this.handleModelChange}
                                                        config={{
                                                            charCounterCount: true,
                                                            charCounterMax: 2000,
                                                            width: '100%',
                                                            heightMin: 200
                                                        }}
                                                    /> : ''}
                                            </Input>
                                        );
                                    })
                                } else {
                                    return (
                                        <Input
                                            key={item.key}
                                            elementType={item.elementType}
                                            elementConfig={item.elementConfig}
                                            label={item.label}
                                            value={this.state[item.key]}
                                            handleChange={(event) => this.inputChangedHandler(event, item.key)}
                                            customProps={item.customProps}
                                        >
                                            {this.state.loadedData ?
                                                <FroalaEditor
                                                    model={this.state.description}
                                                    onModelChange={this.handleModelChange}
                                                    config={{
                                                        charCounterCount: true,
                                                        charCounterMax: 2000,
                                                        width: '100%',
                                                        heightMin: 200
                                                    }}
                                                /> : ''}
                                        </Input>
                                    );
                                }
                            }

                            )}
                        </Form>
                    </div>
                    :
                    notLoaded
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        signedIn: state.user.signedIn,
        uid: state.user.uid,
        account: state.account.account,
        loadedAccount: state.account.loaded,
        errorAccount: state.account.error,
        errorUpdate: state.account.updateError,
        updated: state.account.updated,
        updating: state.account.updating
    }
}

const mapDispatchToProps = dispatch => {
    return {
        retrieveAccount: () => dispatch(actions.retrieveAccount()),
        updateAccount: (formData, upload, fileObj) => {
            return dispatch(actions.updateAccount(formData, upload, fileObj))
        }
    }
}

Account.propTypes = {
    signedIn: PropTypes.bool,
    account: PropTypes.object,
    loadedAccount: PropTypes.bool,
    errorAccount: PropTypes.string,
    errorUpdate: PropTypes.string,
    retrieveAccount: PropTypes.func,
    uid: PropTypes.string,
    updateAccount: PropTypes.func,
    updating: PropTypes.bool,
    updated: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);