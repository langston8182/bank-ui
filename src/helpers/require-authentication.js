import React, {Component} from "react";
import {connect} from "react-redux";

export default function (ChildComponent) {
    class RequireAuthentication extends Component {
        componentDidMount() {
            !this.props.isAuthenticated && this.props.history.push("/");
        }

        render() {
            return this.props.isAuthenticated && <ChildComponent/>;
        }
    }

    const mapStateToProps = (state) => {
        return {
            user: state.auth.user,
            isAuthenticated: state.auth.isAuthenticated
        }
    };

    return connect(mapStateToProps)(RequireAuthentication);
}