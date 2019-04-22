import axios from 'axios';
import {
    ADD_OPERATION,
    DELETE_OPERATION,
    LIST_USER_OPERATION,
    SET_OPERATION_TO_MODIFY,
    SET_AUTHENTICATION
} from "./action-type";
export const URL_SERVICE_UTILISATEUR = "http://localhost:8100";

export function listUserOperations({id}) {
    return function(dispatch) {
        const option = {
            method: "GET",
            url: `${URL_SERVICE_UTILISATEUR}/operations/${id}`,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(response => {
            dispatch({
                type: LIST_USER_OPERATION,
                payload: response.data.operationDtos
            });
        });
    }
}

export function deleteOperation({id}) {
    return function(dispatch) {
        const data = {
            id: id
        };
        const option = {
            method: "DELETE",
            url: `${URL_SERVICE_UTILISATEUR}/operations/`,
            data: data,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(() => {
            dispatch({
                type: DELETE_OPERATION,
                payload: id
            });
        });
    }
}

export function modifyOperation({id, labelOperation, dateOperation, price}) {
    return function(dispatch) {
        const data = {
            id: id,
            intitule: labelOperation,
            dateOperation: dateOperation,
            prix: price
        };
        const option = {
            method: "PUT",
            url: `${URL_SERVICE_UTILISATEUR}/operations`,
            data: data,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(response => {
            console.log('---------------');
            console.log('', response);
            console.log('---------------');

        });
    }
}

export function setOperationToModify(operationToModify) {
    return {
        type: SET_OPERATION_TO_MODIFY,
        payload: operationToModify
    };
}

export function addOperation({id}, {labelOperation, dayOfMonth, price}) {
    return function(dispatch) {
        const data = {
            intitule: labelOperation,
            dateOperation: getCurrentDateWithInputDay(dayOfMonth),
            prix: price
        };
        const option = {
            method: "POST",
            url: `${URL_SERVICE_UTILISATEUR}/operations/${id}`,
            data: data,
            headers: {
                "Authorization": 'bearer ' + localStorage.getItem("token")
            }
        };
        axios(option).then(response => {
            console.log('---------------');
            console.log('', response);
            console.log('---------------');

            dispatch({
                type: ADD_OPERATION,
                payload: response.data
            })
        });
    };
}

function getCurrentDateWithInputDay(day) {
    let date = new Date();
    date.setDate(day - 1);

    return date;
}