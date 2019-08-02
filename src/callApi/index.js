import {axios} from '../import';
import {baseUrl} from '../import/const';

export default function callApi(endpoint, method, body = null) {
    return axios({
        url: baseUrl + '/' + endpoint,
        timeout: 20000,
        method: method,
        data: body,
        responseType: 'json',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}