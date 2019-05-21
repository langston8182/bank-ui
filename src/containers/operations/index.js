import React, {Component} from "react";
import {connect} from "react-redux";
import AddModifyOperationForm from "./add-modify-operation-form";
import OperationList from "./operations-list";
import {addOperation, setOperationToModify} from "../../actions/operations";
import PaginationYear from "./pagination-year";
import PermanentOperationButtons from "../../components/permanent-operation-buttons";
import {filteredPermanentOperation} from "../../selectors";

class IndexOperation extends Component {


    componentWillMount() {
        this.props.setOperationToModify(undefined);
    }

    addPermanentOperation({label, day, price}) {
        const {currentMonth, addOperation} = this.props;
        const operation = {
            labelOperation: label,
            dayOfMonth: day,
            price: price
        };
        addOperation(currentMonth, operation);
    };


    render() {
        return (
            <div>
                <div className="row justify-content-md-center">
                    <h1>Modifier opérations</h1>
                </div>
                <div className="row justify-content-md-left">
                    <AddModifyOperationForm />
                </div>
                <div className="row justify-content-md-left">
                    <PermanentOperationButtons permanentOperations={this.props.filteredPermanentOperations}
                                               addPermanentOperationCallback={po => this.addPermanentOperation(po)}/>
                </div>
                <OperationList />
                <div className="row justify-content-md-center">
                    <PaginationYear />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setOperationToModify: setOperationToModify,
    addOperation: addOperation
};

const mapStateToProps = (state) => {
    return {
        operationToModify: state.operation.operationToModify,
        permanentOperations: state.permanentOperation.permanentOperations,
        currentUser: state.authentication.connectedUser,
        currentMonth: state.operation.currentMonth,
        filteredPermanentOperations: filteredPermanentOperation(state)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexOperation);