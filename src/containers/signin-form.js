import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import  {signin} from "../actions";
import * as validation from "../validations/index";

const FIELDS = {
    email: "email",
    password: "password"
}

class SigninForm extends Component {
    handleSubmit = (credentials) => {
        this.props.signin(credentials, this.props.history);
    };

    renderInputComponent = field => {
        return (
            <fieldset className="col-md-4 form-group">
                <label className="bmd-label-floating">
                    {field.label}
                </label>
                <input type={field.type} {...field.input} className="form-control" />
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
                    <h1>Connexion</h1>
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
                        label="password"
                    />
                </div>
                <div className="row justify-content-md-center">
                    <button type="submit" className="btn btn-primary btn-raised">
                        Connexion
                    </button>
                </div>
            </form>
        );
    }
}

function validate(formValues) {
    const errors = {};
    errors.email = validation.validateEmail(formValues.email);
    errors.password = validation.validateNotEmpty(formValues.password);

    return errors;
}

const mapDispatchToProps = {
    signin
};

const mapStateToProps = (state) => {
    return {}
};

const signinForm = reduxForm({
    form: "signin",
    fields: Object.keys(FIELDS),
    validate
})(SigninForm);

export default connect(mapStateToProps, mapDispatchToProps)(signinForm);