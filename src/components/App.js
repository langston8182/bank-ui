import React, {Component} from 'react';
import Header from "../containers/header";
import {Route, Switch} from "react-router-dom";
import Home from "./home";
import Erreur from "../containers/error";
import Users from "../containers/users";
import AddUserForm from "../containers/add-user-form";
import SigninForm from "../containers/signin-form";
import SignupForm from '../containers/signup-form';
import ForgotPassword from '../containers/forgot-password-form';
import ForgotPasswordSucces from "./forgot-password-succes";
import ForgotPasswordVerification from '../containers/forgot-password-verification-form';
import ModifyUserForm from "../containers/modify-user-form";
import IndexOperation from "../containers/operations/index";
import IndexOperationPermanente from "../containers/operations-permanentes/index";
import {connect} from "react-redux";
import {Auth} from 'aws-amplify';
import {changeAuth} from '../actions'
import RequireAuthentication from '../helpers/require-authentication';
import ChangePassword from "../containers/change-password-form";

require("../index.css");


class App extends Component {

    async componentDidMount() {
        try {
            await Auth.currentSession();
            const user = await Auth.currentAuthenticatedUser();
            this.props.changeAuth(user, true);
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
          <div className="container body_content">
              <Header />
              <Erreur />
              <div className="container body_content">
                  <Switch >
                      <Route exact path="/" component={Home} />
                      <Route exact path="/signin" component={SigninForm} />
                      <Route exact path="/signup" component={SignupForm} />
                      <Route exact path="/forgotpassword" component={ForgotPassword} />
                      <Route exact path="/forgotpasswordverification" component={ForgotPasswordVerification} />
                      <Route exact path="/forgotpasswordsucces" component={ForgotPasswordSucces} />
                      <Route exact path="/changepassword" component={ChangePassword} />
                      <Route exact path="/users" component={RequireAuthentication(Users)} />
                      <Route exact path="/users/modify-user-form/:id" component={RequireAuthentication(ModifyUserForm)} />
                      <Route exact path="/add-user-form" component={RequireAuthentication(AddUserForm)} />
                      <Route exact path="/operations" component={RequireAuthentication(IndexOperation)} />
                      <Route exact path="/operations-permanentes" component={RequireAuthentication(IndexOperationPermanente)} />
                  </Switch>
              </div>
          </div>
      );
  }
}

const mapDispatchToProps = {
    changeAuth
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
