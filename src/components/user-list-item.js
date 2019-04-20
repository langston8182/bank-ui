import React from 'react';

const UserListItem = (props) => {
    const {firstName, lastName, email} = props.user;
    return (
        <tr key={email}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
        </tr>
    );
};

export default UserListItem;