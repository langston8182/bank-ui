import React, {Component} from "react";
import {connect} from "react-redux";
import {listUsers} from "../actions/users";
import {Link} from "react-router-dom";
import UserListItem from "../components/user-list-item";

class Users extends Component {

    componentWillMount() {
        this.props.listUsers();
    }

    renderUser = (user) => {
        const {firstName, lastName, email} = user;

        return (
            <tr key={email}>
                <td>{firstName}</td>
                <td>{lastName}</td>
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
                        this.props.users.map(user => (
                            <UserListItem key={user.email} user={user} />
                        ))
                    }
                    </tbody>
                </table>
                <Link to={"add-user-form"}>
                    <button type="button" className="btn btn-primary btn-raised">Ajouter</button>
                </Link>
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