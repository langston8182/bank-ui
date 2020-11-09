import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signup} from "../actions/signup";
import {Field, reduxForm} from "redux-form";
import * as validation from "../validations/index";

const FIELDS = {
    email: "email",
    login: "login",
    password: "password",
    secondPassword: "secondPassword"
};

class SignupForm extends Component {
    handleSubmit = user => {
        this.props.signup(user, this.props.history);
    };

    renderAddUserComponent = field => {
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
                    <h1>Inscription</h1>
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.login}
                        component={this.renderAddUserComponent}
                        type="text"
                        label="login"
                    />
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.email}
                        component={this.renderAddUserComponent}
                        type="text"
                        label="email"
                    />
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.password}
                        component={this.renderAddUserComponent}
                        type="password"
                        label="Mot de passe"
                    />
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.secondPassword}
                        component={this.renderAddUserComponent}
                        type="password"
                        label="Mot de passe (Répétez)"
                    />
                </div>
                <div className="row justify-content-md-center">
                    <button type="submit" className="btn btn-primary btn-raised">
                        Ajouter
                    </button>
                </div>
            </form>
        );
    }
}

function validate(formValues) {
    const errors = {};
    errors.email = validation.validateEmail(formValues.email);
    errors.login = validation.validateNotEmpty(formValues.login);
    errors.password = validation.validateNotEmpty(formValues.password);
    errors.secondPassword = validation.validateEqual(formValues.password, formValues.secondPassword);

    return errors;
}

const mapDispatchToProps = {
    signup
};

const mapStateToProps = () => {
    return {}
};

const addUserForm = reduxForm({
    form: "signup",
    fields: Object.keys(FIELDS),
    validate
})(SignupForm);

export default connect(mapStateToProps, mapDispatchToProps)(addUserForm);
