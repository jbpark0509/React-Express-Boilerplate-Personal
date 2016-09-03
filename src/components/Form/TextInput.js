import React from 'react';
import * as validations from 'libs/validations';

export default class TextInput extends React.Component {

    constructor(props) {
        super(props);
        this.validateInput = this.validateInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.handleChange({
            target: {
                name: this.props.name,
                value: this.props.value
            }
        });
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.validateInput({ name, value })
            .then(this.props.inputChange)
            .then((input) => {
                this.props.handleInputChange(input);
            });
    }

    validateInput(input) {
        return new Promise((res) => {
            let error = false;
            if (this.props.required && !validations.required(input.value)) {
                error = `This ${this.props.displayName} is required`;
            } else if (this.props.email && !validations.email(input.value)) {
                error = `Invalid email address`;
            } else if (this.props.minLength && !validations.minLength(this.props.minLength)(input.value)) {
                error = `Minimum length for ${this.props.displayName} is ${this.props.minLength}`;
            } else if (this.props.maxLength && !validations.maxLength(this.props.maxLength)(input.value)) {
                error = `Maximum length for ${this.props.displayName} is ${this.props.maxLength}`;
            }
            this.error = error ? true : false;
            res({...input, error });
        });
    }

    render() {
        return (
            <div className="form-group">
                <input
                    className={ this.error && this.props.submitted ? 'form-control input-error' : 'form-control' }
                    type={this.props.type || 'text'}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.handleChange}/>
            </div>
        );
    }
}

TextInput.propTypes = {
    inputChange: React.PropTypes.func,
    handleInputChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    displayName: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    required: React.PropTypes.bool,
    email: React.PropTypes.bool,
    minLength: React.PropTypes.number,
    maxLength: React.PropTypes.number,
    submitted: React.PropTypes.bool,
};
