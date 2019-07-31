import React, {
    Component
} from 'react';

import Profile from './Profile';
import {
    FormErrors
} from './FormErrors';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {
                email: '',
                password: ''
            },
            emailValid: false,
            passwordValid: false,
            formValid: false

        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid && this.state.passwordValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }



    handleSubmit(event) {
        const user = {
            email: this.state.email,
            password: this.state.password
        };

        event.preventDefault();
        fetch('/login', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'X-My-Custom-Header': 'value-v',
                'content-type': 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.props.history.push('/profile/:id' + responseJson.id);
            window.localStorage.setItem('rr_login', responseJson.id);

        })
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
                [name]: value
            },
            () => {
                this.validateField(name, value)
            });
    }
    render() {
        return (
            <form onSubmit = {this.handleSubmit } >
            <div>
            <FormErrors formErrors={this.state.formErrors} />
            </div>

            <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
            <input
            type="email"
            name="email"
            placeholder = "E-mail"
            value = { this.state.email}
            onChange={this.handleUserInput}
            />
            </div>

            <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
            <input
            name="password"
            type = "password"
            placeholder = "Password"
            value = { this.state.password }
            onChange={this.handleUserInput}
            />
            </div>
            <button disabled={!this.state.formValid}> Sign up < /button>
             </form>
        );
    }
}




export default Login;