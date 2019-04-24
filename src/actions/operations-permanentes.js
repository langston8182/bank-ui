import axios from "axios";
import {LIST_USER_OPERATION_PERMANENTE} from "./action-type";
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