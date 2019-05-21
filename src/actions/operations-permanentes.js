import axios from "axios";
import {
    ADD_PERMANENT_OPERATION,
    DELETE_PERMANENT_OPERATION,
    LIST_USER_OPERATION_PERMANENTE, MODIFY_PERMANENT_OPERATION,
    SET_PERMANENT_OPERATION_TO_MODIFY
} from "./action-type";
export const URL_SERVICE_UTILISATEUR = "http://localhost:8100";

export function listUserPermanentOperations() {
    return (dispatch) => {
        const option = {
            method: "GET",
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes`,
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

export function setPermanentOperationToModify(permanentOperationToModify) {
    return {
        type: SET_PERMANENT_OPERATION_TO_MODIFY,
        payload: permanentOperationToModify
    };
}

export function modifyPermanentOperation({id, label, day, price}) {
    return (dispatch) => {
        const data = {
            id: id,
            intitule: label,
            jour: day,
            prix: price
        };

        const option = {
            method: "PUT",
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes`,
            data: data,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(response => {
            dispatch({
                type: MODIFY_PERMANENT_OPERATION,
                payload: response.data
            });
            dispatch(setPermanentOperationToModify(undefined));
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
            url: `${URL_SERVICE_UTILISATEUR}/operations-permanentes`,
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