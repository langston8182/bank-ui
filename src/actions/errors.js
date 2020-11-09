import {PARSE_ERROR} from "./action-type";

export default function parseError(error) {
    return {
        type: PARSE_ERROR,
        payload: error
    };
}
