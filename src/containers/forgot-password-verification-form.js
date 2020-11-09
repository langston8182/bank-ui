import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import * as validation from "../validations";
import {forgotPasswordVerificaton} from "../actions/forgotpasswordverification";

const FIELDS = {
    email: "email",
    code: "code",
    password: "password"
};

class ForgotPasswordVerification extends Component {
    handleSubmit = (verification) => {
        this.props.forgotPasswordVerificaton(verification, this.props.history);
    };

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

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="row justify-content-md-center">
                    <h1>Nouveau mot de passe</h1>
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.code}
                        component={this.renderInputComponent}
                        type="text"
                        label="Code de vérification"
                    />
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
                    <Field
                        name={FIELDS.password}
                        component={this.renderInputComponent}
                        type="password"
                        label="Mot de passe"
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
    errors.code = validation.validateNotEmpty(formValues.code);
    errors.password = validation.validateNotEmpty(formValues.password);

    return errors;
}

const mapDispatchToProps = {
    forgotPasswordVerificaton
}

const mapStateToProps = (state) => {
    return {}
}

const forgotPasswordVerificationForm = reduxForm({
    form: "forgotPasswordVerification",
    fields: Object.keys(FIELDS),
    validate
})(ForgotPasswordVerification);

export default connect(mapStateToProps, mapDispatchToProps)(forgotPasswordVerificationForm)
