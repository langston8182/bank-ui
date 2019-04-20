import {LIST_USERS} from "../actions/action-type";

const initialState = [];

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_USERS:
            let users = [];
            action.payload.map(user => (
                users.push({
                    firstName: user.prenom,
                    lastName: user.nom,
                    email: user.email,
                    password: user.motDePasse
                })
            ));
            return users.map(user => user);

        default:
            return state;
    }
};