import React, {Component} from 'react';
import {connect} from 'react-redux';
import {permanentOperationToModify} from "../../selectors";

class ActionPermanentOperationButton extends Component {
    render() {
        const {permanentOperationToModify} = this.props;

        return (
            <button type="submit" className="btn btn-warning btn-raised">
                {permanentOperationToModify === undefined ? "Ajouter" : "Modifier"}
            </button>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {
        permanentOperationToModify: permanentOperationToModify(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionPermanentOperationButton);