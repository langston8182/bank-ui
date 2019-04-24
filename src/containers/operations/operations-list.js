import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteOperation, setOperationToModify} from "../../actions/operations";
import OperationListItem from "../../components/operation-list-item";
import {retrieveAllOperationsByMonth, retrieveOperationToModifyInForm} from "../../selectors";

class OperationsList extends Component {

    deleteOperation(operation) {
        this.props.deleteOperation(operation);
    }

    setOperationToModify(id) {
        if (this.props.operationToModify === undefined || this.props.operationToModify.id !== id) {
            this.props.setOperationToModify(id);
        } else {
            this.props.setOperationToModify(undefined);
        }
    }

    renderUserOperations = () => {
        return this.props.operations.map(operation => (
            <OperationListItem
                key={operation.id}
                operation={operation}
                operationToModify={this.props.operationToModify}
                deleteOperationCallBack={operation => this.deleteOperation(operation)}
                setOperationToModifyCallBack={id => this.setOperationToModify(id)}/>
        ));
    };

    calculateTotal = () => {
        const {operations} = this.props;
        return operations.reduce(
            (acc, operation2) => acc + operation2.price, 0);
    }

    render() {
        return (
            <div className="body_content">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th>Date</th>
                            <th>Nom</th>
                            <th>Prix</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderUserOperations()}
                        <tr>
                            <td colSpan="4">
                                Total : {this.calculateTotal()}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = {
    deleteOperation,
    setOperationToModify
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.connectedUser,
        operations: retrieveAllOperationsByMonth(state),
        operationToModify: retrieveOperationToModifyInForm(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationsList);