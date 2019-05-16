import React, { Component } from 'react';
import Header from "../containers/header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SigninForm from "../containers/signin-form";
import Home from "./home";
import Erreur from "../containers/error";
import Signout from "../containers/signout"
import Users from "../containers/users";
import AddUserForm from "../containers/add-user-form";
import ModifyUserForm from "../containers/modify-user-form";
import IndexOperation from "../containers/operations/index";
import IndexOperationPermanente from "../containers/operations-permanentes/index";
import LoginPage from "../containers/login-okta";
import {SecureRoute, ImplicitCallback, withAuth} from "@okta/okta-react";
import OktaAuthComponent from "../helpers/require-authentication";

require("../index.css");


class App extends Component {
    render() {
      return (
          <div className="container body_content">
              <Header />
              <Erreur />
              <div className="container body_content">
                  <Switch >
                      <Route exact path="/" component={Home} />
                      <Route exact path="/signout" component={Signout} />
                      <Route exact path="/users" component={Users} />
                      <Route exact path="/users/modify-user-form/:id" component={ModifyUserForm} />
                      <Route exact path="/add-user-form" component={AddUserForm} />
                      <SecureRoute exact path="/operations" component={IndexOperation} />
                      <Route exact path="/operations-permanentes" component={IndexOperationPermanente} />
                      <Route exact path="/implicit/callback" component={ImplicitCallback} />
                  </Switch>
              </div>
          </div>
      );
  }
}

export default App;
