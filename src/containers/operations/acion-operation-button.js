import React, {Component} from 'react';
import {connect} from 'react-redux';
import {operationToModify} from "../../selectors";

class AcionOperationButton extends Component {
    render(props) {
        const {operationToModify} = this.props;

        return (
            <button type="submit" className="btn btn-warning btn-raised">
                {operationToModify === undefined ? "Ajouter" : "Modifier"}
            </button>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {
        operationToModify: operationToModify(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AcionOperationButton);