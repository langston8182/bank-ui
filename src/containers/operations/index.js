import React, {Component} from "react";
import {connect} from "react-redux";
import AddModifyOperationForm from "./add-modify-operation-form";
import OperationList from "./operations-list";
import {setOperationToModify} from "../../actions/operations";
import PaginationYear from "./pagination-year";

class IndexOperation extends Component {


    componentWillMount() {
        this.props.setOperationToModify(undefined);
    }


    render() {
        return (
            <div>
                <div className="row justify-content-md-center">
                    <h1>Modifier opérations</h1>
                </div>
                <div className="row justify-content-md-left">
                    <AddModifyOperationForm />
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
    setOperationToModify: setOperationToModify
};

const mapStateToProps = (state) => {
    return {
        operationToModify: state.operation.operationToModify
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexOperation);