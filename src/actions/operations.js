import axios from 'axios';
import {
    ADD_OPERATION,
    DELETE_OPERATION,
    LIST_USER_OPERATION,
    SET_OPERATION_TO_MODIFY,
    MODIFY_OPERATION, SET_CURRENT_MONTH
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
            dispatch(setOperationToModify(undefined));
        });
    }
}

export function modifyOperation(currentMonth, {id, labelOperation, dayOfMonth, price}) {
    return function(dispatch) {
        const data = {
            id: id,
            intitule: labelOperation,
            dateOperation: getCurrentDateWithMonthAndInputDay(currentMonth, dayOfMonth),
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
            dispatch({
                type: MODIFY_OPERATION,
                payload: response.data
            });
            dispatch(setOperationToModify(undefined));
        });
    }
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

export function addOperation({id}, currentMonth, {labelOperation, dayOfMonth, price}) {
    return function(dispatch) {
        const data = {
            intitule: labelOperation,
            dateOperation: getCurrentDateWithMonthAndInputDay(currentMonth, dayOfMonth),
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
            dispatch({
                type: ADD_OPERATION,
                payload: response.data
            })
        });
    };
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