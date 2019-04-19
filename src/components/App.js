import React, { Component } from 'react';
import Header from "../containers/header";
import { Route, Switch } from "react-router-dom";
import SigninForm from "../containers/signin-form";
import Home from "./home";

require("../index.css");

class App extends Component {
  render() {
    return (
      <div className="container body_content">
        <Header />
        <div className="container body_content">
          <Switch >
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SigninForm} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
