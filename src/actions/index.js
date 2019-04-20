import {CONNECTION, SET_AUTHANTICATION} from "./action-type";
import axios from 'axios';
const qs = require('qs');

export const URL_AUTHENTICATION = "http://localhost:8090/auth/oauth/token";

export function setAuthentication(isLoggedIn, token) {
    return {
        type: SET_AUTHANTICATION,
        payload: {
            isLoggedIn: isLoggedIn,
            token: token.access_token
        }
    };
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
            console.log('---------------');
            console.log('', response);
            console.log('---------------');

            dispatch(setAuthentication(true, response.data));
        });
    };
}