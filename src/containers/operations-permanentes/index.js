import React, {Component} from 'react';
import {connect} from 'react-redux';
import PermanentOperationsList from "./permanent-operations-list";

class IndexOperationPermanente extends Component {
    render() {
        return (
            <div>
                <div className="row justify-content-md-center">
                    <h1>Modifier les opérations permanentes</h1>
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