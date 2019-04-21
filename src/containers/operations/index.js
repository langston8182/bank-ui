import React, {Component} from "react";
import {connect} from "react-redux";
import AddOperationForm from "./add-operation-form";
import OperationList from "./operations-list";

class IndexOperation extends Component {
    render() {
        return (
            <div>
                <div className="row justify-content-md-center">
                    <h1>Modifier opérations</h1>
                </div>
                <div className="row justify-content-md-left">
                    <AddOperationForm />
                </div>
                <OperationList />
            </div>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexOperation);