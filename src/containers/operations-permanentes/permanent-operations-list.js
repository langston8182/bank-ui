import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listUserPermanentOperations} from "../../actions/operations-permanentes";
import PermanentOperationListItem from "../../components/permanent-operation-list-item";
import {deletePermanentOperation} from "../../actions/operations-permanentes";

class PermanentOperationsList extends Component {
    deletePermanentOperation(permanentOperation) {
        this.props.deletePermanentOperation(permanentOperation);
    }

    renderUserPermanentOperations = () => {
        return this.props.permanentOperations.map(permanentOperation => (
            <PermanentOperationListItem
                key={permanentOperation.id}
                permanentOperation={permanentOperation}
                deletePermanentOperationCallBack={permanentOperation => this.deletePermanentOperation(permanentOperation)}
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
    listUserPermanentOperations,
    deletePermanentOperation
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.connectedUser,
        permanentOperations: state.permanentOperation.permanentOperations,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PermanentOperationsList);