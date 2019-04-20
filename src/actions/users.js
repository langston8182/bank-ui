import axios from 'axios';
import {LIST_USERS} from "./action-type";

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