import {CONNECTED_USER, PARSE_ERROR, RESET_ERROR, SET_AUTHENTICATION} from "./action-type";
import axios from 'axios';
const qs = require('qs');

export const URL_AUTHENTICATION = "http://localhost:8090/auth/oauth/token";
export const URL_ME = "http://localhost:8090/auth/user/me";

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
            dispatch({
                type: CONNECTED_USER,
                payload: {
                    firstName: response.data.prenom,
                    lastName: response.data.nom,
                    id: response.data.id
                }
            })
        });
    }
}

export function signin({email, password}, history) {
    return function(dispatch) {
        const data = {
            username: email,
            password: password,
            grant_type: "password"
        };

        const option = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(data),
            url: URL_AUTHENTICATION,
            auth: {
                username: "client",
                password: "password"
            }
        };

        axios(option).then(response => {
            localStorage.setItem("token", response.data.access_token);
            dispatch(resetError());
            dispatch(setAuthentication(true));
            dispatch(getConnectedUser());
        }).catch(error => {
            dispatch(parseError("Identifiants incorrects"));
        });
    };
}

export function signout() {
    return function(dispatch) {
        dispatch(setAuthentication(false));
        localStorage.removeItem("token");
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