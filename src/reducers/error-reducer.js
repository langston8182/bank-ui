import {PARSE_ERROR, RESET_ERROR} from "../actions/action-type";

const initialState = {
    message: ""
};

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case PARSE_ERROR:
            return {
                message: action.payload
            };

        case RESET_ERROR:
            return {
                message: ""
            };

        default:
            return state;
    }
};