import {Auth} from "aws-amplify";
import parseError from "./errors";

export function signup({login, email, password}, history) {
    return async function (dispatch) {
        try {
            console.log(login)
            await Auth.signUp({
                username: login,
                password,
                attributes: {
                    email
                }
            });
            history.push("/")
        } catch (err) {
            console.log(err.message);
            dispatch(parseError(err.message));
        }
    }
}