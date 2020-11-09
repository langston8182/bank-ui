import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {
    ADD_PERMANENT_OPERATION,
    DELETE_PERMANENT_OPERATION,
    LIST_USER_OPERATION_PERMANENTE, MODIFY_PERMANENT_OPERATION,
    SET_PERMANENT_OPERATION_TO_MODIFY
} from "./action-type";
export const URL_SERVICE_UTILISATEUR = "https://3txyvppun4.execute-api.us-east-1.amazonaws.com/prod";

export function listUserPermanentOperations(id) {
    return (dispatch) => {
        const option = {
            method: "GET",
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes?idUtilisateur=${id}`,
        };
        axios(option).then(response => {
            dispatch({
                type: LIST_USER_OPERATION_PERMANENTE,
                payload: response.data
            });
        });
    }
}

export function setPermanentOperationToModify(permanentOperationToModify) {
    return {
        type: SET_PERMANENT_OPERATION_TO_MODIFY,
        payload: permanentOperationToModify
    };
}

export function modifyPermanentOperation({id, intitule, jour, prix}) {
    return (dispatch) => {
        const data = {
            id,
            intitule,
            jour,
            prix
        };

        const option = {
            method: "PUT",
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes/${id}`,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios(option).then(() => {
            dispatch({
                type: MODIFY_PERMANENT_OPERATION,
                payload: data
            });
            dispatch(setPermanentOperationToModify(undefined));
        });
    }
}

export function deletePermanentOperation({id}) {
    return function(dispatch) {
        const option = {
            method: "DELETE",
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes/${id}`,
        };
        axios(option).then(() => {
            dispatch({
                type: DELETE_PERMANENT_OPERATION,
                payload: id
            })
        })
    }
}

export function addPermanentOperation({id}, {jour, intitule, prix}) {
    return function(dispatch) {
        const data = {
            id: uuidv4(),
            idUtilisateur: id,
            intitule,
            jour,
            prix
        };
        const option = {
            method: "POST",
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes/`,
            data: data,
            headers: {
                "content-type": "application/json"
            }
        };
        axios(option).then(() => {
            dispatch({
                type: ADD_PERMANENT_OPERATION,
                payload: data
            })
        })
    }
}