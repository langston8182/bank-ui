import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signout} from "../actions";

class Signout extends Component {

    componentWillMount() {
        this.props.signout();
    }


    render() {
        return (
            <div>

            </div>
        );
    }
}

const mapDispatchToProps = {
    signout
};

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Signout);