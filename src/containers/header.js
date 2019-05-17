import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {signin, signout, isAuthenticated} from "../actions";
import {withAuth} from '@okta/okta-react';

class Header extends Component {

    renderConnectedUser = () => {
        if (this.props.connectedUser) {
            const {firstName, lastName} = this.props.connectedUser;
            return (
                `(${firstName} ${lastName})`
            );
        }
    };

    renderAuthenticationLink() {
        const {auth} = this.props;
        if (this.props.isLoggedIn) {
            return (
                <li className="nav-item">
                    <Link to="#" onClick={() => this.props.signout(auth)} className="nav-link">Déconnexion {this.renderConnectedUser()}</Link>
                </li>
            );
        } else {
            return (
                <li className="nav-item">
                    <Link to="#" onClick={() => this.props.signin(auth)} className="nav-link">Connexion</Link>
                </li>
            );
        }
    }

    render() {
        return (
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">Accueil</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/users"} className="nav-link">Utilisateurs</Link>
                </li>
                <li className="nav-item dropdown">
                    <a href="#"
                          className="nav-link dropdown-toggle"
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false">Actions</a>
                    <div className="dropdown-menu">
                        <Link to={"/operations"} className="dropdown-item">Operations</Link>
                        <Link to={"/operations-permanentes"} className="dropdown-item">Operations permanentes</Link>
                    </div>
                </li>
                {this.renderAuthenticationLink()}
            </ul>
        );
    }
}

const mapDispatchToProps = {
    signin,
    signout,
    isAuthenticated
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.isLoggedIn,
        connectedUser: state.authentication.connectedUser
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Header));