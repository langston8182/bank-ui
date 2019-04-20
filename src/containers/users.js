import React, {Component} from 'react';
import {connect} from 'react-redux';
import {listUsers} from "../actions/users";

class Users extends Component {

    componentWillMount() {
        this.props.listUsers();
    }

    renderUser = (user) => {
        const {nom, prenom, email} = user;

        return (
            <tr key={email}>
                <td>{nom}</td>
                <td>{prenom}</td>
                <td>{email}</td>
            </tr>
        );
    };

    render() {
        return (
            <div className="row justify-content-md-center">
                <div className="row justify-content-md-center">
                    <h1>Utilisateurs</h1>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.users.map(user => {
                           return this.renderUser(user);
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapDispatchToProps = {
    listUsers
};

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);