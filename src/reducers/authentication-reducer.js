import {SIGN_IN, SIGN_OUT, CHANGE_AUTH} from "../actions/action-type";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default function authenticationReducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN:
            const user = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    id: user.attributes.sub,
                    nom: user.username,
                    email: user.attributes.email
                }
            };

        case SIGN_OUT:
            return {
                ...state,
                isAuthenticated: false,
                user: {}
            };

        case CHANGE_AUTH:
            const {isAuthenticated} = action.payload;
            return {
                ...state,
                isAuthenticated: isAuthenticated,
                user: action.payload.user
            }

        default:
            return state
    }
}
