import {CONNECTED_USER, SET_AUTHENTICATION} from "../actions/action-type";

const initialState = {
    isLoggedIn: false,
    connectedUser: {}
};

export default function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
            return {
                isLoggedIn: action.payload
            };

        case CONNECTED_USER:
            const {firstName, lastName, id} = action.payload;
            return {
                ...state,
                connectedUser: {
                    firstName: firstName,
                    lastName: lastName,
                    id: id
                }
            };

        default:
            return state
    }
}