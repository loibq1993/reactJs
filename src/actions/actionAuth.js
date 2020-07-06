import callApi from "../callApi";
import * as act from "./actionCreators";

export const actRequestLogin = (formData) => {
    return async (dispatch) => {
        try {
            const res = await callApi('user/login', 'POST', formData);
            // console.log(res.data.access_token);
            // localStorage.setItem("access_token", res.data.access_token);
            console.log(res);
            dispatch(act.actLogin(res.data));
        }
        catch (errors) {
            console.log(errors)
            // dispatch(act.actLoginFailed(errors.data));
        }
    }
};