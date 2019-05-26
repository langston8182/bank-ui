import axios from 'axios';
import {ADD_USER, CONNECTED_USER, LIST_USERS} from "./action-type";
import {parseError} from "./index";
import {listUserOperations} from "./operations";
import {listUserPermanentOperations} from "./operations-permanentes";

export const URL_SERVICE_UTILISATEUR = "http://localhost:8100";

export function listUsers() {
    return function(dispatch) {
        const option = {
            method: "GET",
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs/`,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(response => {
            dispatch({
                type: LIST_USERS,
                payload: response.data.utilisateurDtos
            });
        })
    };
}

export function getUserByEmail(email) {
    return function(dispatch) {
        const option = {
            method: "GET",
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs?email=${email}`,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(response => {
            const {nom, prenom, email, identifiant} = response.data;
            dispatch({
                type: CONNECTED_USER,
                payload: {
                    firstName: prenom,
                    lastName: nom,
                    email: email,
                    id: identifiant
                }
            });

            dispatch(listUserOperations(identifiant));
            dispatch(listUserPermanentOperations(identifiant));
        });
    };
}

export function deleteUser({id}, history) {
    return function(dispatch) {
        const data = {
            identifiant: id
        };
        const option = {
            method: "DELETE",
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs`,
            data: data,
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token"),
                "content-type": "application/json"
            }
        };
        axios(option).then(() => {
            dispatch(listUsers());
            history.push("/users");
        });
    }
}

export function modifyUser({lastName, firstName, email, id}, history) {
    return function() {
        const data = {
            nom: lastName,
            prenom: firstName,
            email: email,
            identifiant: id
        };
        const option = {
            method: "PUT",
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs/`,
            data: data,
            headers: {
                "Authorization": "bearer " + localStorage.getItem("token"),
                "content-type": "application/json"
            }
        };
        axios(option).then(response => {
            history.push("/users");
        });
    }
}

export function addUser({lastName, firstName, email, password}, history) {
    return function(dispatch) {
        const data = {
            nom: lastName,
            prenom: firstName,
            email: email,
            motDePasse: password
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
        }).catch(error => {
            dispatch(parseError(error.response.data.message));
        });
    }
}