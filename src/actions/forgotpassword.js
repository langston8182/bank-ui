import {Auth} from 'aws-amplify';
import parseError from "./errors";

export function forgotPassword({email}, history) {
    return async function(dispatch) {
        try {
            await Auth.forgotPassword(email);
            history.push("/forgotpasswordverification");
        } catch(error) {
            dispatch(parseError(error.message));
        }
    }
}