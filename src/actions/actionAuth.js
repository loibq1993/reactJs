import callApi from "../callApi";
import * as act from "./actionCreators";

export const actRequestLogin = (formData) => {
    return async (dispatch) => {
        try {
            const res = await callApi('user/login', 'POST', formData);
            localStorage.setItem("token", res.data.token);
            dispatch(act.actLogin(res.data.user));
        }
        catch (errors) {
            localStorage.removeItem("token");
            // dispatch(act.actLoginFailed(errors.data));
        }
    }
};