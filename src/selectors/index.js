import lodash from 'lodash';

export const getUserById = (users, id) => (
    lodash.find(users, user => {
        return user.id === id;
    })
);
