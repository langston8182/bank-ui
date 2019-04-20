import React from 'react';

const UserListItem = (props) => {
    const {firstName, lastName, email} = props.user;

    function deleteUser(user) {
        props.deleteUserCallBack(user);
    }

    return (
        <tr key={email}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td><button className="btn btn-danger btn-raised" onClick={() => deleteUser(props.user)}>Supprimer</button></td>
        </tr>
    );
};

export default UserListItem;