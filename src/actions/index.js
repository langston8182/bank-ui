import {PARSE_ERROR, RESET_ERROR, SIGN_IN, SIGN_OUT, CHANGE_AUTH} from "./action-type";
import {Auth} from "aws-amplify";
import {listUserOperations} from "./operations";
import {listUserPermanentOperations} from './operations-permanentes';
import parseError from './errors';

export function changeAuth(user, isAuthenticated) {
    return function(dispatch) {
        const payload = {
            user: {
                id: user.attributes.sub,
                nom: user.username,
                email: user.attributes.email
            },
            isAuthenticated
        };
        dispatch({
            type: CHANGE_AUTH,
            payload
        });
        dispatch(listUserOperations(payload.user.id));
        dispatch(listUserPermanentOperations(user.attributes.sub));
    };
}

export function signin({email, password}, history) {
    return async function (dispatch) {
        try {
            const user = await Auth.signIn(email, password);
            history.push("/");
            dispatch({
                type: SIGN_IN,
                payload: user
            })
            dispatch(listUserOperations(user.attributes.sub));
            dispatch(listUserPermanentOperations(user.attributes.sub));
        } catch (err) {
            console.log(err.message);
            dispatch(parseError(err.message));
        }
    };
}

export function signout() {
    return async function (dispatch) {
        try {
            await Auth.signOut();
            dispatch({
                type: SIGN_OUT
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function resetError() {
    return {
        type: RESET_ERROR
    };
}