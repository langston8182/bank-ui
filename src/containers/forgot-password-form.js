import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {forgotPassword} from '../actions/forgotpassword';
import * as validation from "../validations";

const FIELDS = {
    email: "email"
}

class ForgotPassword extends Component {
    renderInputComponent = field => {
        return (
            <fieldset className="col-md-4 form-group">
                <label className="bmd-label-floating">
                    {field.label}
                </label>
                <input type={field.type} {...field.input} className="form-control"/>
                {
                    field.meta.touched && field.meta.error &&
                    <span className="error">{field.meta.error}</span>
                }
            </fieldset>
        );
    };

    handleSubmit = (email) => {
        this.props.forgotPassword(email, this.props.history);
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="row justify-content-md-center">
                    <h1>Retrouvez votre mot de passe</h1>
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.email}
                        component={this.renderInputComponent}
                        type="text"
                        label="email"
                    />
                </div>
                <div className="row justify-content-md-center">
                    <button type="submit" className="btn btn-primary btn-raised">
                        Valider
                    </button>
                </div>
            </form>
        )
    }
}

function validate(formValues) {
    const errors = {};
    errors.email = validation.validateEmail(formValues.email);

    return errors;
}

const mapDispatchToProps = {
    forgotPassword
}

const mapStateToProps = (state) => {
    return {}
}

const forgotPasswordForm = reduxForm({
    form: 'forgotPassword',
    fields: Object.keys(FIELDS),
    validate
})(ForgotPassword);

export default connect(mapStateToProps, mapDispatchToProps)(forgotPasswordForm);