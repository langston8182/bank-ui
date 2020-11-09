import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import ActionPermanentOperationButton from "../operations-permanentes/action-permanent-operation-button";
import {addPermanentOperation, modifyPermanentOperation} from "../../actions/operations-permanentes";
import {retrievePermanentOperationToModifyInForm} from "../../selectors";

const FIELDS = {
    jour: "jour",
    intitule: "intitule",
    prix: "prix",
};

class AddModifyPermanentOperationForm extends Component {

    handleSubmit = (operation) => {
        if (this.props.permanentOperationToModify === undefined) {
            const {addPermanentOperation, currentUser} = this.props;
            addPermanentOperation(currentUser, operation);
        } else {
            const {modifyPermanentOperation} = this.props;
            modifyPermanentOperation(operation);
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
                    <h4>Ajouter une opération pemanente</h4>
                </div>
                <form onSubmit={handleSubmit(this.handleSubmit)} className="form-inline">
                    <Field
                        name={FIELDS.jour}
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

                    <ActionPermanentOperationButton />
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
    addPermanentOperation,
    modifyPermanentOperation
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.user,
        initialValues: retrievePermanentOperationToModifyInForm(state),
        permanentOperationToModify: state.permanentOperation.permanentOperationToModify,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(addPermanentOperationForm);