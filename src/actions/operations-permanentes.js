import axios from "axios";
import {ADD_PERMANENT_OPERATION, DELETE_PERMANENT_OPERATION, LIST_USER_OPERATION_PERMANENTE} from "./action-type";
export const URL_SERVICE_UTILISATEUR = "http://localhost:8100";

export function listUserPermanentOperations({id}) {
    return function(dispatch) {
        const option = {
            method: "GET",
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes/${id}`,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(response => {
            dispatch({
                type: LIST_USER_OPERATION_PERMANENTE,
                payload: response.data.operationPermanenteDtos
            });
        });
    }
}

export function deletePermanentOperation({id}) {
    return function(dispatch) {
        const data = {
            id: id
        };
        const option = {
            method: "DELETE",
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes/`,
            data: data,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(() => {
            dispatch({
                type: DELETE_PERMANENT_OPERATION,
                payload: id
            })
        })
    }
}

export function addPermanentOperation({id}, {day, label, price}) {
    return function(dispatch) {
        const data = {
            intitule: label,
            jour: day,
            prix: price
        };
        const option = {
            method: "POST",
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes/${id}`,
            data: data,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(response => {
            dispatch({
                type: ADD_PERMANENT_OPERATION,
                payload: response.data
            })
        })
    }
}