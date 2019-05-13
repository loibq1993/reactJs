import {axios} from '../import';
const url = 'http://laravel.cc/api';


export default function callApi(endpoint, method, body = null) {
    return axios({
        url: url + '/' + endpoint,
        timeout: 20000,
        method: method,
        data: body,
        responseType: 'json',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}