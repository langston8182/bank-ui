import {LIST_USERS} from "../actions/action-type";

const initialState = [];

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_USERS:
            return action.payload;

        default:
            return state;
    }
};