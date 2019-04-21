import React, { Component } from 'react';
import Header from "../containers/header";
import { Route, Switch } from "react-router-dom";
import SigninForm from "../containers/signin-form";
import Home from "./home";
import Erreur from "../containers/error";
import Signout from "../containers/signout"
import Users from "../containers/users";
import AddUserForm from "../containers/add-user-form";
import ModifyUserForm from "../containers/modify-user-form";

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
            <Route exact path="/signin" component={SigninForm} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/users/modify-user-form/:id" component={ModifyUserForm} />
            <Route exact path="/add-user-form" component={AddUserForm} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
