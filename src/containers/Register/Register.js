import React from 'react';
import { Form, TextInput } from 'components';
import { connect } from 'react-redux';
import * as AuthActions from 'actions/AuthActions';
import { Link } from 'react-router';

@connect((store) => {
    return {
        registering: store.auth.isRegistering || false,
        registerError: store.auth.registerError || '',
    };
})

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            reemail: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.matchEmailValidation = this.matchEmailValidation.bind(this);
    }

    handleInputChange({ name, value }) {
        const state = {};
        state[name] = value;
        this.setState(state);
    }

    matchEmailValidation(name, value) {
        if (name === 'email') {
            return {
                success: value === this.state.reemail,
                errorMessage: 'Email must match with re-email'
            };
        }
    }

    handleRegister() {
        console.log('Register User!');
        this.props.dispatch(AuthActions.register({...this.state }));
    }

    render() {
        return (
            <div>
                <h3>Register New User</h3>
                <Form
                    onSubmit={this.handleRegister}
                    customValidations={[this.matchEmailValidation]}>
                    <TextInput
                        value = {this.state.fname}
                        name = {'fname'}
                        displayName = { 'first name' }
                        placeholder = {'First Name'}
                        required
                        handleInputChange = {this.handleInputChange}/>
                    <TextInput
                        value = {this.state.lname}
                        name = {'lname'}
                        displayName = { 'last name' }
                        placeholder = {'Last Name'}
                        required
                        handleInputChange = {this.handleInputChange}/>
                    <TextInput
                        value = {this.state.email}
                        name = {'email'}
                        displayName = { 'email address' }
                        placeholder = {'Email Address'}
                        required
                        email
                        handleInputChange = {this.handleInputChange}/>
                    <TextInput
                        value = {this.state.reemail}
                        name = {'reemail'}
                        displayName = { 're-email address' }
                        placeholder = {'Re-Email Address'}
                        required
                        email
                        handleInputChange = {this.handleInputChange}/>
                    <TextInput
                        value = {this.state.password}
                        type = {'password'}
                        name = {'password'}
                        displayName = { 'password' }
                        placeholder = {'Password'}
                        required
                        handleInputChange = {this.handleInputChange}/>
                </Form>
                <Link to="/login">
                    <span>Login</span>
                </Link>
            </div>
        );
    }
}

Register.propTypes = {
    dispatch: React.PropTypes.func,
    registering: React.PropTypes.bool,
    registerError: React.PropTypes.string
};
