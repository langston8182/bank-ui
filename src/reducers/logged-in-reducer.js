import {SET_AUTHENTICATION} from "../actions/action-type";

const initialState = {
    isLoggedIn: false
};

export default function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
            console.log('---------------');
            console.log('', );
            console.log('---------------');

            return {
                isLoggedIn: action.payload.isLoggedIn
            };

        default:
            return state
    }
}