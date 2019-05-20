import React, {Component} from 'react';
import Header from "../containers/header";
import {Route, Switch} from "react-router-dom";
import Home from "./home";
import Erreur from "../containers/error";
import Signout from "../containers/signout"
import Users from "../containers/users";
import AddUserForm from "../containers/add-user-form";
import ModifyUserForm from "../containers/modify-user-form";
import IndexOperation from "../containers/operations/index";
import IndexOperationPermanente from "../containers/operations-permanentes/index";
import {ImplicitCallback, SecureRoute, withAuth} from "@okta/okta-react";
import {setAuthentication} from "../actions";
import {getUserByEmail} from "../actions/users";
import {connect} from "react-redux";

require("../index.css");


class App extends Component {

    async componentWillMount() {
        this.authenticate();
    }


    async componentDidUpdate() {
        this.authenticate();
    }

    async authenticate() {
        const isAuthenticated = await this.props.auth.isAuthenticated();

        if (isAuthenticated && !this.props.currentUser) {
            const accessToken = await this.getAccessToken();
            const {email} = await this.getUserInfo();
            localStorage.setItem("token", accessToken);
            this.props.setAuthentication(true);
            this.props.getUserByEmail(email);
        } else if (!isAuthenticated && localStorage.getItem("token")) {
            localStorage.removeItem("token");
        }
    }

    async getAccessToken() {
        return await this.props.auth.getAccessToken();
    }

    async getUserInfo() {
        return await this.props.auth.getUser();
    }

    render() {
        return (
          <div className="container body_content">
              <Header />
              <Erreur />
              <div className="container body_content">
                  <Switch >
                      <Route exact path="/" component={Home} />
                      <Route exact path="/signout" component={Signout} />
                      <SecureRoute exact path="/users" component={Users} />
                      <SecureRoute exact path="/users/modify-user-form/:id" component={ModifyUserForm} />
                      <SecureRoute exact path="/add-user-form" component={AddUserForm} />
                      <SecureRoute exact path="/operations" component={IndexOperation} />
                      <Route exact path="/operations-permanentes" component={IndexOperationPermanente} />
                      <Route exact path="/implicit/callback" component={ImplicitCallback} />
                  </Switch>
              </div>
          </div>
      );
  }
}

const mapDispatchToProps = {
    setAuthentication,
    getUserByEmail
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.authentication.connectedUser,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(App));
