import {
    ADD_PERMANENT_OPERATION,
    DELETE_PERMANENT_OPERATION,
    LIST_USER_OPERATION_PERMANENTE,
    MODIFY_PERMANENT_OPERATION,
    SET_PERMANENT_OPERATION_TO_MODIFY
} from "../actions/action-type";
import lodash from "lodash";

const initialState = {
    permanentOperationToModify: undefined,
    permanentOperations: [],
};

export default function permanentOperations(state = initialState, action) {
    switch (action.type) {
        case LIST_USER_OPERATION_PERMANENTE:
            let permanentOperations = [];
            action.payload.map(permanentOperation => (
                permanentOperations.push({
                    id: permanentOperation.identifiant,
                    label: permanentOperation.intitule,
                    day: permanentOperation.jour,
                    price: permanentOperation.prix
                })
            ));
            return {
                ...state,
                permanentOperations: permanentOperations
            };

        case ADD_PERMANENT_OPERATION:
            const permanentOperation = {
                id: action.payload.identifiant,
                day: action.payload.jour,
                price: action.payload.prix,
                label: action.payload.intitule
            };
            return {
                ...state,
                permanentOperations: [...state.permanentOperations, permanentOperation]
            };

        case MODIFY_PERMANENT_OPERATION:
            const permanentOperationModify = {
                id: action.payload.identifiant,
                label: action.payload.intitule,
                day: action.payload.jour,
                price: action.payload.prix
            };

            return {
                ...state,
                permanentOperations: replaceObjectByAnotherInArrayByIndex(
                    lodash.findIndex(state.permanentOperations, {id: action.payload.id}),
                    state.permanentOperations,
                    permanentOperationModify)
            };

        case DELETE_PERMANENT_OPERATION:
            let permanentOperationsInState = state.permanentOperations.slice();
            lodash.remove(permanentOperationsInState, val => {
                return val.id === action.payload
            });
            return {
                ...state,
                permanentOperations: permanentOperationsInState
            };

        case SET_PERMANENT_OPERATION_TO_MODIFY:
            return {
                ...state,
                permanentOperationToModify: action.payload
            };

        default:
            return state;
    }

    function replaceObjectByAnotherInArrayByIndex(index, array, newObject) {
        let newArr = array.slice();
        newArr.splice(index, 1, newObject);

        return newArr;
    }
}