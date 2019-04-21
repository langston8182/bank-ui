import {ADD_OPERATION, LIST_USER_OPERATION} from "../actions/action-type";

const initialState = [];

export default function listUserOperations(state = initialState, action) {
    switch (action.type) {
        case LIST_USER_OPERATION:
            let operations = [];
            action.payload.map(operation => (
                operations.push({
                    id: operation.id,
                    label: operation.intitule,
                    dateOperation: operation.dateOperation,
                    price: operation.prix
                })
            ));
            return operations.map(operation => operation);

        case ADD_OPERATION:
            const {id, intitule, dateOperation, prix} = action.payload;
            const operation = {
                id: id,
                label: intitule,
                dateOperation: dateOperation,
                price: prix
            }
            return [...state, operation];

        default:
            return state
    }
}