import {combineReducers} from "redux";
import {reducer as form} from 'redux-form';
import AuthenticationReducer from './logged-in-reducer';
import ErrorReducer from './error-reducer';
import UsersReducer from './users-reducer';
import UserOperations from './operations-reducer';
import UserPermanentOperations from './permanent-operations-reducer';

const rootReducer = combineReducers({
    form,
    authentication: AuthenticationReducer,
    error: ErrorReducer,
    users: UsersReducer,
    operation: UserOperations,
    permanentOperation: UserPermanentOperations
});

export default rootReducer;