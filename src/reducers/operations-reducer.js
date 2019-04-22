import {ADD_OPERATION, DELETE_OPERATION, LIST_USER_OPERATION, SET_OPERATION_TO_MODIFY} from "../actions/action-type";
import lodash from 'lodash';

const initialState = {operationToModify: undefined, operations: []};

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
            return {operations: operations.map(operation => operation)};

        case ADD_OPERATION:
            const {id, intitule, dateOperation, prix} = action.payload;
            const operation = {
                id: id,
                labelOperation: intitule,
                dateOperation: dateOperation,
                price: prix
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

        case SET_OPERATION_TO_MODIFY:
            return {
                ...state,
                operationToModify: action.payload
            };

        default:
            return state
    }
}