import {CONNECTED_USER, LIST_USER_OPERATION, PARSE_ERROR, RESET_ERROR, SET_AUTHENTICATION} from "./action-type";
import axios from 'axios';
import {listUserOperations} from "./operations";
import {listUserPermanentOperations} from "./operations-permanentes";

const qs = require('qs');

export const URL_AUTHENTICATION = "https://dev-847930.okta.com/oauth2/default/v1/token";
export const URL_ME = "https://dev-847930.okta.com/oauth2/default/v1/userInfo";

export function setAuthentication(isLoggedIn) {
    return {
        type: SET_AUTHENTICATION,
        payload: {
            isLoggedIn: isLoggedIn
        }
    };
}

export function getConnectedUser() {
    return function(dispatch) {
        const option = {
            method: "GET",
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token")
            },
            url: `${URL_ME}`
        };

        axios(option).then(response => {
            const {prenom, nom, id} = response.data;
            dispatch({
                type: CONNECTED_USER,
                payload: {
                    firstName: prenom,
                    lastName: nom,
                    id: id
                }
            });
            dispatch(listUserOperations({id}));
            dispatch(listUserPermanentOperations({id}));
        });
    }
}

export function isAuthenticated(auth) {
    return function(dispatch) {
        auth.isAuthenticated().then(response => {
            dispatch({
                type: SET_AUTHENTICATION,
                payload: response
            })
        });
    }
}

export function signin(auth) {
    return function(dispatch) {
        auth.login().then(() => {
            dispatch(isAuthenticated(auth));
        });
    };
}

export function signout(auth) {
    return function(dispatch) {
        auth.logout().then(response => {
            dispatch({
                type: SET_AUTHENTICATION,
                payload: false
            })
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