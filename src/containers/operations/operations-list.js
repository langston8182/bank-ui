import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listUserOperations} from "../../actions/operations";
import OperationListItem from "../../components/operation-list-item";

class OperationsList extends Component {

    componentDidUpdate(next) {
        const {currentUser} = this.props;
        currentUser !== next.currentUser && this.props.listUserOperations(currentUser);
    }

    renderUserOperations = () => {
        return this.props.operations.map(operation => (
            <OperationListItem key={operation.id} operation={operation} />
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
    listUserOperations
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.connectedUser,
        operations: state.operations
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationsList);