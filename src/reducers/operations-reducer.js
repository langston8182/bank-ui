import {
    ADD_OPERATION,
    DELETE_OPERATION,
    LIST_USER_OPERATION,
    MODIFY_OPERATION, SET_CURRENT_MONTH,
    SET_OPERATION_TO_MODIFY
} from "../actions/action-type";
import lodash from 'lodash';

const initialState = {
    operationToModify: undefined,
    operations: [],
    currentMonth: new Date().getMonth()
};

export default function listUserOperations(state = initialState, action) {
    switch (action.type) {
        case LIST_USER_OPERATION:
            let operations = [];
            action.payload.map(operation => (
                operations.push({
                    id: operation.id,
                    labelOperation: operation.intitule,
                    dateOperation: operation.dateOperation,
                    price: operation.prix
                })
            ));
            return {
                ...state,
                operations: operations.map(operation => operation)
            };

        case ADD_OPERATION:
            const operation = {
                id: action.payload.id,
                labelOperation: action.payload.intitule,
                dateOperation: action.payload.dateOperation,
                price: action.payload.prix
            };
            return {
                ...state,
                operations: [...state.operations, operation],
            };

        case DELETE_OPERATION:
            let operationsInState = state.operations.slice();
            lodash.remove(operationsInState, val => {
                return val.id === action.payload
            });

            return {
                ...state,
                operations: operationsInState
            };

        case MODIFY_OPERATION:
            const operationModify = {
                id: action.payload.id,
                labelOperation: action.payload.intitule,
                dateOperation: action.payload.dateOperation,
                price: action.payload.prix
            };

            return {
                ...state,
                operations: replaceObjectByAnotherInArrayByIndex(
                    lodash.findIndex(state.operations, {id: action.payload.id}),
                    state.operations,
                    operationModify)
            };

        case SET_OPERATION_TO_MODIFY:
            return {
                ...state,
                operationToModify: action.payload
            };

        case SET_CURRENT_MONTH:
            return {
                ...state,
                currentMonth: action.payload
            };

        default:
            return state
    }

    function replaceObjectByAnotherInArrayByIndex(index, array, newObject) {
        let newArr = array.slice();
        newArr.splice(index, 1, newObject);

        return newArr;
    }
}