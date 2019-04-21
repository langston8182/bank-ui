import axios from 'axios';
import {ADD_OPERATION, LIST_USER_OPERATION} from "./action-type";
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

export function addOperation({id}, {labelOperation, dayOfMounth, price}) {
    return function(dispatch) {
        const data = {
            intitule: labelOperation,
            dateOperation: getCurrentDateWithInputDay(dayOfMounth),
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