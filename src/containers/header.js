import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

class Header extends Component {


    render() {
        return (
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link to={"/"} className="nav-link">Accueil</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/signin"} className="nav-link">Connexion</Link>
                </li>
            </ul>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);