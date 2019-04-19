import {combineReducers} from "redux";
import {reducer as form} from 'redux-form';
import AuthenticationReducer from './logged-in-reducer';

const rootReducer = combineReducers({
    form,
    authentication: AuthenticationReducer
});

export default rootReducer;