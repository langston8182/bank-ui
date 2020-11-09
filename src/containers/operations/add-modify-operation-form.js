import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {addOperation, modifyOperation} from "../../actions/operations";
import ActionOperationButton from "./action-operation-button";
import {retrieveOperationToModifyInForm} from "../../selectors";

const FIELDS = {
    dayOfMonth: "dayOfMonth",
    intitule: "intitule",
    prix: "prix",
};

class AddModifyOperationForm extends Component {
    handleSubmit = (operation) => {
        if (this.props.operationToModify === undefined) {
            const {addOperation, currentMonth} = this.props;
            const idUtilisateur = this.props.user.id;
            addOperation(idUtilisateur, currentMonth, operation);
        } else {
            const {modifyOperation, currentMonth} = this.props;
            modifyOperation(currentMonth, operation);
        }
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
                    <h4>Ajouter opération</h4>
                </div>
                <form onSubmit={handleSubmit(this.handleSubmit)} className="form-inline">
                    <Field
                        name={FIELDS.dayOfMonth}
                        component={this.renderAddOperationComponent}
                        type="text"
                        label="Jour du mois"
                    />
                    <Field
                        name={FIELDS.intitule}
                        component={this.renderAddOperationComponent}
                        type="text"
                        label="Libelle"
                    />
                    <Field
                        name={FIELDS.prix}
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

const addOperationForm = reduxForm({
    form: "addOperation",
    fields: Object.keys(FIELDS),
    enableReinitialize: true
})(AddModifyOperationForm);

const mapDispatchToProps = {
    addOperation,
    modifyOperation
};

const mapStateToProps = (state) => {
    return {
        initialValues: retrieveOperationToModifyInForm(state),
        operationToModify: state.operation.operationToModify,
        currentMonth: state.operation.currentMonth,
        user: state.auth.user
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(addOperationForm);