import {PARSE_ERROR, RESET_ERROR, SET_AUTHENTICATION} from "./action-type";

export function setAuthentication(isLoggedIn) {
    return function (dispatch) {
        dispatch({
            type: SET_AUTHENTICATION,
            payload: {
                isLoggedIn: isLoggedIn
            }
        });
    };
}

export function isAuthenticated(auth) {
    return function (dispatch) {
        auth.isAuthenticated().then(response => {
            dispatch({
                type: SET_AUTHENTICATION,
                payload: response
            });
        });
    }
}

export function signin(auth) {
    return function () {
        auth.login();
    };
}

export function signout(auth, history) {
    return function (dispatch) {
        history.push("/");
        auth.logout().then(response => {
            dispatch({
                type: SET_AUTHENTICATION,
                payload: false
            });
        });
    }
}

export function parseError(error) {
    return {
        type: PARSE_ERROR,
        payload: error
    };
}

export function resetError() {
    return {
        type: RESET_ERROR
    };
}