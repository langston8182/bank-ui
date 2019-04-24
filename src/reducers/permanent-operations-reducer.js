import {ADD_PERMANENT_OPERATION, LIST_USER_OPERATION_PERMANENTE} from "../actions/action-type";

const initialState = {
    permanentOperations: [],
};

export default function permanentOperations(state = initialState, action) {
    switch (action.type) {
        case LIST_USER_OPERATION_PERMANENTE:
            let permanentOperations = [];
            action.payload.map(permanentOperation => (
                permanentOperations.push({
                    id: permanentOperation.id,
                    labelPermanentOperation: permanentOperation.intitule,
                    dayPermanentOperation: permanentOperation.jour,
                    price: permanentOperation.prix
                })
            ));
            return {
                ...state,
                permanentOperations: permanentOperations.map(permanentOperation => permanentOperation)
            };

        case ADD_PERMANENT_OPERATION:
            const permanentOperation = {
                id: action.payload.id,
                dayPermanentOperation: action.payload.jour,
                price: action.payload.prix,
                labelPermanentOperation: action.payload.intitule
            };
            return {
                ...state,
                permanentOperations: [...state.permanentOperations, permanentOperation]
            };

        default:
            return state;
    }
}