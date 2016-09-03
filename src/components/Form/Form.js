import React from 'react';

export default class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: new Map(),
            showErrors: false,
            submitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.errors.size > 0) {
            this.setState({ showErrors: true, submitted: true });
        } else {
            this.setState({ showErrors: false, submitted: true });
            this.props.onSubmit();
        }
    }

    inputChange({ name, value, error }) {
        return new Promise((res) => {
            const errors = this.state.errors;
            if (error) {
                errors.set(name, error);
            } else {
                errors.delete(name);
            }
            if (this.props.customValidations) {
                let customValidationMessage = false;
                for (const validation of this.props.customValidations) {
                    const { success, errorMessage } = validation(name, value) || { success: true };
                    if (!success) {
                        customValidationMessage = errorMessage;
                        errors.set('customError', customValidationMessage);
                        break;
                    }
                }
                if (!customValidationMessage) {
                    errors.delete('customError');
                }
            }
            this.setState({ errors });
            res({ name, value });
        });
    }

    showErrors() {
        const errorComponent = [];
        this.state.errors.forEach((error, name) => {
            errorComponent.push(<li key={name}>{error}</li>);
        });
        return errorComponent;
    }

    render() {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                inputChange: this.inputChange,
                submitted: this.state.submitted
            })
        );

        return (
            <form onSubmit={this.handleSubmit}>
                {childrenWithProps}
                <div className="form-group">
                    <button type="submit" className="btn btn-primary form-control">Submit</button>
                </div>
                { this.state.showErrors ? <div>{this.showErrors()}</div> : null }
            </form>
        );
    }
}

Form.propTypes = {
    children: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]),
    onSubmit: React.PropTypes.func,
    customValidations: React.PropTypes.array
};
