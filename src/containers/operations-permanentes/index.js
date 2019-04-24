import React, {Component} from 'react';
import {connect} from 'react-redux';
import PermanentOperationsList from "./permanent-operations-list";
import AddModifyPermanentOperationForm from "./add-modify-permanent-operation-form";

class IndexOperationPermanente extends Component {
    render() {
        return (
            <div>
                <div className="row justify-content-md-center">
                    <h1>Modifier les opérations permanentes</h1>
                </div>
                <div className="row justify-content-md-left">
                    <AddModifyPermanentOperationForm />
                </div>
                <PermanentOperationsList />
            </div>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexOperationPermanente);