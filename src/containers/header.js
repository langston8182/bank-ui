import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {signin, signout} from "../actions";
import {withRouter} from "react-router";

class Header extends Component {
    render() {
        return (
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">Accueil</Link>
                </li>
                {this.props.isAuthenticated && (
                    <li className="nav-item">
                        <Link to={"/users"} className="nav-link">Utilisateurs</Link>
                    </li>
                )}
                {this.props.isAuthenticated && (
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
                )}
                {this.props.isAuthenticated && (
                    <li className="nav-item dropdown">
                        <a href="#"
                           className="nav-link dropdown-toggle"
                           data-toggle="dropdown"
                           role="button"
                           aria-haspopup="true"
                           aria-expanded="false">Admin</a>
                        <div className="dropdown-menu">
                            <Link to={"/changepassword"} className="dropdown-item">Modifier mot de passe</Link>
                        </div>
                    </li>
                )}
                {!this.props.isAuthenticated && (
                    <li className="nav-item">
                        <Link to={"/signin"} className="nav-link">Signin</Link>
                    </li>
                )}
                {!this.props.isAuthenticated && (
                    <li className="nav-item">
                        <Link to={"/signup"} className="nav-link">Signup</Link>
                    </li>
                )}
                {this.props.isAuthenticated && (
                    <li className="nav-item">
                        <Link to={"/"} className="nav-link" onClick={this.props.signout}>Signout</Link>
                    </li>
                )}
                <li className="nav-item">
                    <Link to={"#"} className="nav-link">
                        {this.props.user.nom && (
                            <p>Bonjour {this.props.user.nom}</p>
                        )}
                    </Link>
                </li>
            </ul>
        );
    }
}

const mapDispatchToProps = {
    signin,
    signout,
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));