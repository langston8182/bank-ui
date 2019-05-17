import React from 'react';
import {Link} from "react-router-dom";

const UserListItem = (props) => {
    const {firstName, lastName, email, id} = props.user;
    const {match} = props;

    function deleteUser(user) {
        props.deleteUserCallBack(user);
    }

    return (
        <tr key={email}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>
                <div className="btn-toolbar float-right">
                    <Link to={`${match.url}/modify-user-form/${id}`}>
                        <button className="btn btn-info btn-raised btn-space">Modifier</button>
                    </Link>
                    <button className="btn btn-danger btn-raised"
                            onClick={() => deleteUser(props.user)}>Supprimer</button>
                </div>
            </td>
        </tr>
    );
};

export default UserListItem;