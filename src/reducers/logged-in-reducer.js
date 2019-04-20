import {SET_AUTHANTICATION} from "../actions/action-type";

const initialState = {
    isLoggedIn: false
};

export default function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHANTICATION:
            return {
                isLoggedIn: action.payload
            }

        default:
            return state
    };
}