import React, {Component} from 'react';
import {connect} from 'react-redux';
import PermanentOperationListItem from "../../components/permanent-operation-list-item";
import {deletePermanentOperation, setPermanentOperationToModify} from "../../actions/operations-permanentes";
import {retrievePermanentOperationToModifyInForm} from "../../selectors";

class PermanentOperationsList extends Component {
    deletePermanentOperation(permanentOperation) {
        this.props.deletePermanentOperation(permanentOperation);
    }

    setPermanentOperationToModify(id) {
        if (this.props.permanentOperationToModify === undefined || this.props.permanentOperationToModify.id !== id) {
            this.props.setPermanentOperationToModify(id);
        } else {
            this.props.setPermanentOperationToModify(undefined);
        }
    }

    renderUserPermanentOperations = () => {
        return this.props.permanentOperations.map(permanentOperation => (
            <PermanentOperationListItem
                key={permanentOperation.id}
                permanentOperation={permanentOperation}
                permanentOperationToModify={this.props.permanentOperationToModify}
                deletePermanentOperationCallBack={permanentOperation => this.deletePermanentOperation(permanentOperation)}
                setPermanentOperationToModifyCallBack={id => this.setPermanentOperationToModify(id)}
            />
        ));
    };

    render() {
        return (
            <div className="body_content">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Jour</th>
                        <th>Intitulé</th>
                        <th>Prix</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderUserPermanentOperations()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = {
    deletePermanentOperation,
    setPermanentOperationToModify
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.user,
        permanentOperations: state.permanentOperation.permanentOperations,
        permanentOperationToModify: retrievePermanentOperationToModifyInForm(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PermanentOperationsList);