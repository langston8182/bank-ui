import {combineReducers} from "redux";
import {reducer as form} from 'redux-form';
import ErrorReducer from './error-reducer';
import UsersReducer from './users-reducer';
import UserOperations from './operations-reducer';
import UserPermanentOperations from './permanent-operations-reducer';
import AuthenticationReducer from './authentication-reducer';

const rootReducer = combineReducers({
    form,
    error: ErrorReducer,
    users: UsersReducer,
    operation: UserOperations,
    permanentOperation: UserPermanentOperations,
    auth: AuthenticationReducer
});

export default rootReducer;