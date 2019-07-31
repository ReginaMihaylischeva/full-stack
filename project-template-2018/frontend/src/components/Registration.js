import React, {
    Component
} from 'react';
import {
    browserHistory
} from 'react-router';

import Profile from './Profile';
import {
    FormErrors
} from './FormErrors';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            formErrors: {
                email: '',
                password: '',
                name: '',
                surname: ''
            },
            emailValid: false,
            nameValid: false,
            surnameValid: false,
            passwordValid: false,
            formValid: false

        };
        this.handleUserInput = this.handleUserInput.bind(this);

        /*this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSurnameChange = this.handleSurnameChange.bind(this);*/
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {

        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname,
            year: this.state.year
        };
        fetch('/registration', {
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
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let nameValid = this.state.nameValid;
        let surnameValid = this.state.surnameValid;
        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            case 'name':
                nameValid = value.length != 0;
                fieldValidationErrors.name = nameValid ? '' : ' is too short';
            case 'surname':
                surnameValid = value.length != 0;
                fieldValidationErrors.surname = surnameValid ? '' : ' is too short';
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            nameValid: nameValid,
            surnameValid: surnameValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.emailValid && this.state.passwordValid && this.state.surnameValid && this.state.nameValid
        });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
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




    /*
     handleEmailChange(event) {

        this.setState({email: event.target.value});

     }

     handlePasswordChange(event) {
      const value = event.target.value;
       if(event.target.value!='') {
       this.setState({password: event.target.value});
       }
     }

      handleNameChange(event) {
         if(event.target.value.match("^[a-zA-Z ]*$")!=null) {
          this.setState({name: event.target.value});
          }
      }

     handleSurnameChange(event) {
        if(event.target.value.match("^[a-zA-Z ]*$")!=null) {
          this.setState({surname: event.target.value});
          }
     }
    */
    handleYearChange(event) {
        let val = event.target.value;
        if (val >= 0 & event.target.value.match("^[0-9]*$") != null & 100 > val & event.target.value.match("^00*$") == null) {
            this.setState({
                year: val
            });
        }
    }


  render() {

    return (

      <form onSubmit={this.handleSubmit}>
           <div>
            <FormErrors formErrors={this.state.formErrors} />
            </div>
       <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={this.state.email}
          onChange={this.handleUserInput}
        />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
           <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleUserInput}

                />
        </div>

        <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
              <input
                    name="name"
                    type="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleUserInput}
               />
          </div>

          <div className={`form-group ${this.errorClass(this.state.formErrors.surname)}`}>
              <input
                    name="surname"
                    type="surname"
                    placeholder="Surname"
                    value={this.state.surname}
                   onChange={this.handleUserInput}
               />
          </div>
          <div>
             <input
              type="number"
              placeholder="Year"
              value={this.state.year}
              onChange={this.handleYearChange}
               />
          </div>
        <button  disabled={!this.state.formValid}>Save</button>

      </form>
    );
  }
}
export default  Registration;
