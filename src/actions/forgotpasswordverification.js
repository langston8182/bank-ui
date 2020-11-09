import {Auth} from 'aws-amplify';
import parseError from "./errors";

export function forgotPasswordVerificaton({code, email, password}, history) {
    return async function (dispatch) {
        try {
            await Auth.forgotPasswordSubmit(
                email,
                code,
                password
            );
            history.push("/forgotpasswordsucces");
        } catch (error) {
            dispatch(parseError(error.message));
        }
    };
}