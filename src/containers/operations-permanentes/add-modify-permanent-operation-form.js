import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import ActionOperationButton from "../operations/acion-operation-button";
import {addPermanentOperation} from "../../actions/operations-permanentes";

const FIELDS = {
    day: "day",
    label: "label",
    price: "price",
};

class AddModifyPermanentOperationForm extends Component {

    handleSubmit = (operation) => {
        const {addPermanentOperation, currentUser} = this.props;
        addPermanentOperation(currentUser, operation);
    };

    renderAddOperationComponent = field => {
        return (
            <div className="md-form">
                <label className="sr-only">{field.label}</label>
                <input type={field.type} {...field.input} className="form-control mb-2 mr-sm-2"
                       placeholder={field.label}/>
            </div>
        );
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="body_content">
                <div className="row justify-content-md-left">
                    <h4>Ajouter une opération pemanente</h4>
                </div>
                <form onSubmit={handleSubmit(this.handleSubmit)} className="form-inline">
                    <Field
                        name={FIELDS.day}
                        component={this.renderAddOperationComponent}
                        type="text"
                        label="Jour du mois"
                    />
                    <Field
                        name={FIELDS.label}
                        component={this.renderAddOperationComponent}
                        type="text"
                        label="Libelle"
                    />
                    <Field
                        name={FIELDS.price}
                        component={this.renderAddOperationComponent}
                        type="text"
                        label="Prix"
                    />

                    <ActionOperationButton />
                </form>
            </div>
        );
    }
}

const addPermanentOperationForm = reduxForm({
    form: "addPermanentOperation",
    fields: Object.keys(FIELDS),
    enableReinitialize: true
})(AddModifyPermanentOperationForm);

const mapDispatchToProps = {
    addPermanentOperation
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.connectedUser,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(addPermanentOperationForm);