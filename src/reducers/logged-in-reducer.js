import {CONNECTED_USER, SET_AUTHENTICATION} from "../actions/action-type";

const initialState = {
    isLoggedIn: false,
    connectedUser: {}
};

export default function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return {
                isLoggedIn: action.payload.isLoggedIn
            };

        case CONNECTED_USER:
            const {firstName, lastName} = action.payload;
            return {
                ...state,
                connectedUser: {
                    firstName: firstName,
                    lastName: lastName
                }
            }

        default:
            return state
    }
}