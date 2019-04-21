import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

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
        if (this.props.isLoggedIn) {
            return (
                <li className="nav-item">
                    <Link to={"/signout"} className="nav-link">Déconnexion {this.renderConnectedUser()}</Link>
                </li>
            );
        } else {
            return (
                <li className="nav-item">
                    <Link to={"/signin"} className="nav-link">Connexion</Link>
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
                <li className="nav-item">
                    <Link to={"/operations"} className="nav-link">Operations</Link>
                </li>
                {this.renderAuthenticationLink()}
            </ul>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authentication.isLoggedIn,
        connectedUser: state.authentication.connectedUser
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);