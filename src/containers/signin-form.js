import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import  {signin} from "../actions";

const FIELDS = {
    email: "email",
    password: "password"
}

class SigninForm extends Component {
    handleSubmit = (credentials) => {
        this.props.signin(credentials, this.props.history);
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="row justify-content-md-center">
                    <fieldset className="col-md-4 form-group">
                        <label className="bmd-label-floating">
                            Email
                        </label>
                        <Field
                            name={FIELDS.email}
                            component="input"
                            type="text"
                            className="form-control"
                        />
                    </fieldset>
                </div>
                <div className="row justify-content-md-center">
                    <fieldset className="col-md-4 form-group">
                        <label className="bmd-label-floating">
                            Mot de passe
                        </label>
                        <Field
                            name={FIELDS.password}
                            component="input"
                            type="password"
                            className="form-control"
                        />
                    </fieldset>
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

const mapDispatchToProps = {
    signin
};

const mapStateToProps = (state) => {
    return {}
};

const signinForm = reduxForm({
    form: "signin",
    fields: Object.keys(FIELDS)
})(SigninForm);

export default connect(mapStateToProps, mapDispatchToProps)(signinForm);