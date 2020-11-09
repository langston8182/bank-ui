import {Auth} from "aws-amplify";
import parseError from "./errors";

export function changePassword({oldPassword, newPassword}, history) {
    return async function(dispatch) {
        try {
            const user = await Auth.currentAuthenticatedUser();
            await Auth.changePassword(user, oldPassword, newPassword);
            history.push("/forgotpasswordsucces")
        } catch(error) {
            dispatch(parseError(error.message));
        }
    }
}