import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import * as validation from "../validations";
import {changePassword} from '../actions/changepassword';

const FIELDS = {
    oldPassword: "oldPassword",
    newPassword: "newPassword",
    newPasswordConfirm: "newPasswordConfirm"
}

class ChangePassword extends Component {
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

    handleSubmit = (passwordValues) => {
        this.props.changePassword(passwordValues, this.props.history);
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="row justify-content-md-center">
                    <h1>Modification de votre mot de passe</h1>
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.oldPassword}
                        component={this.renderInputComponent}
                        type="password"
                        label="Ancien mot de passe"
                    />
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.newPassword}
                        component={this.renderInputComponent}
                        type="password"
                        label="Nouveau mot de passe"
                    />
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.newPasswordConfirm}
                        component={this.renderInputComponent}
                        type="password"
                        label="Nouveau mot de passe (confirmez)"
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
    errors.oldPassword = validation.validateNotEmpty(formValues.oldPassword);
    errors.newPassword = validation.validateNotEmpty(formValues.newPassword);
    errors.newPasswordConfirm = validation.validateEqual(formValues.newPassword, formValues.newPasswordConfirm);

    return errors;
}

const mapDispatchToProps = {
    changePassword
}

const mapStateToProps = (state) => {
    return {}
}

const changePasswordForm = reduxForm({
    form: 'changePassword',
    fields: Object.keys(FIELDS),
    validate
})(ChangePassword);

export default connect(mapStateToProps, mapDispatchToProps)(changePasswordForm);
