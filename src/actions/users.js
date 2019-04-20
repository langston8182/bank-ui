import axios from 'axios';
import {ADD_USER, LIST_USERS} from "./action-type";
const qs = require('qs');

export const URL_SERVICE_UTILISATEUR = "http://localhost:8100";

export function listUsers() {
    return function(dispatch) {
        const option = {
            method: "GET",
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs`,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(response => {
            dispatch({
                type: LIST_USERS,
                payload: response.data.utilisateursDtos
            });
        })
    };
}

export function addUser(user, history) {
    return function(dispatch) {
        const data = {
            nom: user.lastName,
            prenom: user.firstName,
            email: user.email,
            motDePasse: user.password
        };

        const option = {
            method: "POST",
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs`,
            data: data,
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token"),
                "content-type": "application/json"
            }
        };

        axios(option).then(response => {
            dispatch({
                type: ADD_USER,
                payload: response.data
            });
            history.push("/users");
        })
    }
}