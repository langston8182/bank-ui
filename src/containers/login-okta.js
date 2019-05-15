import React, {Component, useEffect, useState} from 'react';
import {withAuth} from '@okta/okta-react';
import {signin, signout} from "../actions/index";
import {connect} from "react-redux";

class LoginPage extends Component {

    componentWillMount() {
        this.props.signin(this.props.auth);
    }

    render() {
        const {auth, isLoggedIn} = this.props;
        return (
            <div>
                {
                    isLoggedIn ? (
                        <button onClick={() => this.props.signout(auth)}>Logout</button>
                    ) : (
                        <button onClick={() => auth.login()}>Login</button>
                    )
                }
            </div>
        );
    }
}

const mapDispatchToProps = {
    signin,
    signout
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.isLoggedIn
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(LoginPage));