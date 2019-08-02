import callApi from "../callApi";
import * as act from "./actionCreators";

export const actRequestLogin = (formData) => {
    return async (dispatch) => {
        try {
            const res = await callApi('auth/login', 'POST', formData);
            console.log(res.data.access_token);
            localStorage.setItem("access_token", res.data.access_token);
            dispatch(act.actLogin(res.data));
        }
        catch (errors) {
            dispatch(act.actLoginFailed(errors.data));
        }
    }
};