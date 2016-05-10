import React, { Component, PropTypes } from 'react';

export default class Login extends Component {

    render() {
        const { errorMessage } = this.props

        return (
            <div>
                <input type='text' ref='email' className="form-control" placeholder='Email' />
                <input type='password' ref='password' className="form-control" placeholder='Password' />
                <button onClick={(event) => this.handleClick(event) } className="btn btn-primary">
                    Login
                </button>

                {errorMessage &&
                    <p>{errorMessage}</p>
                }
            </div>
        );
}

    handleClick (event) {
        const email = this.refs.email
        const password = this.refs.password
        const creds = { email: email.value.trim(), password: password.value.trim() }
        this.props.onLoginClick(creds)
    }     
};