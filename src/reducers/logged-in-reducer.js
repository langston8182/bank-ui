import {CONNECTED_USER, SET_AUTHENTICATION} from "../actions/action-type";

const initialState = {
    isLoggedIn: false,
    connectedUser: undefined
};

export default function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return {
                isLoggedIn: action.payload
            };

        case CONNECTED_USER:
            const {firstName, lastName, email, id} = action.payload;
            return {
                ...state,
                connectedUser: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    id: id
                }
            };

        default:
            return state
    }
}