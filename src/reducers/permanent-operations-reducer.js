import {LIST_USER_OPERATION_PERMANENTE} from "../actions/action-type";

const initialState = {
    permanentOperations: [],
};

export default function permanentOperations(state = initialState, action) {
    switch (action.type) {
        case LIST_USER_OPERATION_PERMANENTE:
            console.log('---------------');
            console.log('', action);
            console.log('---------------');

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

        default:
            return state;
    }
}