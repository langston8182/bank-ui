import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
    ADD_OPERATION,
    DELETE_OPERATION,
    LIST_USER_OPERATION,
    SET_OPERATION_TO_MODIFY,
    MODIFY_OPERATION, SET_CURRENT_MONTH
} from "./action-type";
export const URL_SERVICE_UTILISATEUR = "https://3txyvppun4.execute-api.us-east-1.amazonaws.com/prod";

export function listUserOperations(idUtilisateur) {
    return function(dispatch) {
        const option = {
            method: "GET",
            url: `${URL_SERVICE_UTILISATEUR}/operations?idUtilisateur=${idUtilisateur}`,
        };
        axios(option).then(response => {
            dispatch({
                type: LIST_USER_OPERATION,
                payload: response.data
            });
        });
    }
}

export function deleteOperation({id}) {
    return function(dispatch) {
        const option = {
            method: "DELETE",
            url: `${URL_SERVICE_UTILISATEUR}/operations/${id}`,
        };
        axios(option).then(() => {
            dispatch({
                type: DELETE_OPERATION,
                payload: id
            });
            dispatch(setOperationToModify(undefined));
        });
    }
}

export function modifyOperation(currentMonth, {id, intitule, dayOfMonth, prix}) {
    return function(dispatch) {
        const data = {
            intitule,
            dateOperation: getCurrentDateWithMonthAndInputDay(currentMonth, dayOfMonth),
            prix
        };

        const option = {
            method: "PUT",
            url: `${URL_SERVICE_UTILISATEUR}/operations/${id}`,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios(option).then(response => {
            dispatch({
                type: MODIFY_OPERATION,
                payload: {
                    id,
                    intitule,
                    dateOperation: data.dateOperation.toISOString(),
                    prix
                }
            });
            dispatch(setOperationToModify(undefined));
        });
    }
}

export function addOperation(idUtilisateur, currentMonth, {intitule, dayOfMonth, prix}) {
    return function(dispatch) {
        const data = {
            id: uuidv4(),
            idUtilisateur,
            intitule,
            dateOperation: getCurrentDateWithMonthAndInputDay(currentMonth, dayOfMonth).toISOString(),
            prix
        };

        const option = {
            method: "POST",
            url: `${URL_SERVICE_UTILISATEUR}/operations/`,
            data: data,
            headers: {
                "content-type": "application/json"
            }
        };
        axios(option).then(() => {
            dispatch({
                type: ADD_OPERATION,
                payload: data
            })
        });
    };
}

export function setOperationToModify(operationToModify) {
    return {
        type: SET_OPERATION_TO_MODIFY,
        payload: operationToModify
    };
}

export function setCurrentMonth(month) {
    return {
        type: SET_CURRENT_MONTH,
        payload: month
    }
}

function getCurrentDateWithInputDay(day) {
    let date = new Date();
    date.setDate(day);

    return date;
}

function getCurrentDateWithMonthAndInputDay(month, day) {
    let date = getCurrentDateWithInputDay(day);
    date.setMonth(month);

    return date;
}