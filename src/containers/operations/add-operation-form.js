import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import {addOperation} from "../../actions/operations";

const FIELDS = {
    dayOfMounth: "dayOfMounth",
    labelOperation: "labelOperation",
    price: "price",
};

class AddOperationForm extends Component {
    handleSubmit = (operation) => {
        this.props.addOperation(this.props.currentUser, operation);
    };

    renderAddOperationComponen = field => {
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
                        name={FIELDS.dayOfMounth}
                        component={this.renderAddOperationComponen}
                        type="text"
                        label="Jour du mois"
                    />
                    <Field
                        name={FIELDS.labelOperation}
                        component={this.renderAddOperationComponen}
                        type="text"
                        label="Libelle"
                    />
                    <Field
                        name={FIELDS.price}
                        component={this.renderAddOperationComponen}
                        type="text"
                        label="Prix"
                    />

                    <button type="submit" className="btn btn-warning btn-raised">
                        Ajouter
                    </button>
                </form>
            </div>
        );
    }
}

const addOperationForm = reduxForm({
    form: "addOperation",
    fields: Object.keys(FIELDS)
})(AddOperationForm);

const mapDispatchToProps = {
    addOperation
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.connectedUser
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(addOperationForm);