import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {ADD_USER, CONNECTED_USER, LIST_USERS} from "./action-type";
import parseError from "./errors";
import {listUserOperations} from "./operations";
import {listUserPermanentOperations} from "./operations-permanentes";
import {Auth} from "aws-amplify";

export const URL_SERVICE_UTILISATEUR = "https://3txyvppun4.execute-api.us-east-1.amazonaws.com/prod";

export function listUsers() {
    return function(dispatch) {
        const option = {
            method: "GET",
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs/`,
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios(option).then(response => {
            dispatch({
                type: LIST_USERS,
                payload: response.data
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
        const option = {
            method: "DELETE",
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs/${id}`,
            headers: {
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
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs/${id}`,
            data: data,
            headers: {
                "content-type": "application/json"
            }
        };
        axios(option).then(response => {
            history.push("/users");
        });
    }
}

export function addUser({lastName, firstName, email, password}, history) {
    return async function (dispatch) {
        try {
            const signUpResponse = await Auth.signUp({
                username: lastName,
                password: password,
                attributes: {
                    email: email
                }
            });
        } catch (err) {
            console.log(err.message);
        }

        const data = {
            id: uuidv4(),
            nom: lastName,
            prenom: firstName,
            email: email
        };

        const option = {
            method: "POST",
            url: `${URL_SERVICE_UTILISATEUR}/utilisateurs`,
            data: data,
            headers: {
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