import React from 'react';
import { Form, TextInput } from 'components';
import * as AuthActions from 'actions/AuthActions';
import { connect } from 'react-redux';
import { Link } from 'react-router';

@connect((store) => {
    return {
        loggingIn: store.auth.loggingIn || false,
        loginError: store.auth.loginError || '',
    };
})

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange({ name, value }) {
        const state = {};
        state[name] = value;
        this.setState(state);
    }

    handleLogin() {
        console.log('Login User!');
        this.props.dispatch(AuthActions.login({ ...this.state }));
    }

    render() {
        return (
            <div>
            	<Form
                    onSubmit={this.handleLogin}>
                    <TextInput
                        value = {this.state.email}
                        name = {'email'}
                        displayName = { 'email' }
                        placeholder = {'Email Address'}
                        email
                        required
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
                <Link to="/register">
                    Register
                </Link>
            </div>
        );
    }
}

Login.propTypes = {
    dispatch: React.PropTypes.func
};
