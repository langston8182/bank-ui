import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listUserOperations, deleteOperation, setOperationToModify} from "../../actions/operations";
import OperationListItem from "../../components/operation-list-item";
import {retrieveOperationToModifyInForm} from "../../selectors";

class OperationsList extends Component {

    componentDidUpdate(next) {
        const {currentUser} = this.props;
        currentUser !== next.currentUser && this.props.listUserOperations(currentUser);
    }

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
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = {
    listUserOperations,
    deleteOperation,
    setOperationToModify
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.connectedUser,
        operations: state.operation.operations,
        operationToModify: retrieveOperationToModifyInForm(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationsList);