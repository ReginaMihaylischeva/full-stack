import React, {
    Component
} from 'react';
import {
    FormErrors
} from './FormErrors';


class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            contentValid: false,
            formValid: false,
            formErrors: {
                content: ''
            },


        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('/addPost', {
            method: 'post',
            body: JSON.stringify({
                content: this.state.content,
                date: new Date(),
                UserId: this.props.id,
                email: this.props.email
            }),
            headers: {
                'X-My-Custom-Header': 'value-v',
                'content-type': 'application/json'
            }

        })


    }

    validateField(value) {
        let fieldValidationErrors = this.state.formErrors;
        let contentValid = this.state.contentValid;
        contentValid = (value.length > 0 && value.length < 2049);
        fieldValidationErrors.content = contentValid ? '' : ' invalid ';

        this.setState({
            formErrors: fieldValidationErrors,
            contentValid: contentValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.contentValid
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
                this.validateField(value)
            });
    }
    render() {

        return (

            < form onSubmit = { this.handleSubmit } >
             <div>
              <FormErrors formErrors={this.state.formErrors} />
              </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.content)}`}>
            < input
            name = "content"
            type = "content"
            placeholder = "Content"
            value = { this.state.content}
            onChange = {this.handleUserInput }
            />
            </div>

            < button  disabled={!this.state.formValid}> Add post < /button>
            < /form >
        );
    }
}
export default NewPost;