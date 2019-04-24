import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listUserPermanentOperations} from "../../actions/operations-permanentes";
import PermanentOperationListItem from "../../components/permanent-operation-list-item";

class PermanentOperationsList extends Component {
    componentDidUpdate(next) {
        const {currentUser} = this.props;
        currentUser !== next.currentUser && this.props.listUserPermanentOperations(currentUser);
    }

    renderUserPermanentOperations = () => {
        return this.props.permanentOperations.map(permanentOperation => (
            <PermanentOperationListItem
                key={permanentOperation.id}
                permanentOperation={permanentOperation}
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
    listUserPermanentOperations
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.connectedUser,
        permanentOperations: state.permanentOperation.permanentOperations,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PermanentOperationsList);