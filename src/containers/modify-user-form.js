import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import lodash from 'lodash';
import {getUserById} from "../selectors";
import {modifyUser} from "../actions/users";

const FIELDS = {
    email: "email",
    lastName: "lastName",
    firstName: "firstName",
    password: "password",
    secondPassword: "secondPassword"
};

class ModifyUserForm extends Component {


    componentDidMount() {
        !this.props.initialValues && this.props.history.push("/users");
    }


    handleSubmit = user => {
        this.props.modifyUser(user, this.props.history);
    };

    renderAddUserComponent = field => {
        return (
            <fieldset className="col-md-4 form-group">
                <label className="bmd-label-floating">
                    {field.label}
                </label>
                <input type={field.type} {...field.input} className="form-control" />
            </fieldset>
        );
    };

    render() {
        const {handleSubmit} = this.props;
        //const currentUser = this.getUser(this.props.match.params.id);

        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <div className="row justify-content-md-center">
                    <h1>Modifier utilisateur</h1>
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.firstName}
                        component={this.renderAddUserComponent}
                        type="text"
                        label="Prénom"
                    />
                </div>
                <div className="row justify-content-md-center">
                    <Field
                        name={FIELDS.lastName}
                        component={this.renderAddUserComponent}
                        type="text"
                        label="Nom"
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
                    <button type="submit" className="btn btn-primary btn-raised">
                        Modifier
                    </button>
                </div>
            </form>
        );
    }
}

const modifyUserForm = reduxForm({
    form: "modifyUser",
    fields: Object.keys(FIELDS),
})(ModifyUserForm);

const mapDispatchToProps = {
    modifyUser
};

const mapStateToProps = (state, props) => {
    return {
        initialValues: getUserById(state.users, props.match.params.id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(modifyUserForm);