import callApi from "../callApi";
import * as act from "./actionCreators";

export const actRequestLogin = (formData) => {
    return (dispatch) => {
        return callApi('auth/login','POST',formData)
            .then((res) => {
                console.log(res.data.access_token);
                localStorage.setItem("access_token", res.data.access_token);
                dispatch(act.actLogin(res.data));
            })
            .catch( (errors) => {
                dispatch(act.actLoginFailed(errors.data))
            });
    }
};