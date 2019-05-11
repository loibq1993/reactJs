import {axios} from '../import';
const url = 'http://laravel.cc';


export default function callApi(endpoint, method, body = null) {
    return axios({
        url: url + '/' + endpoint,
        timeout: 20000,
        method: method,
        data: body,
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data',
        }
    }).catch( (error) => {
        console.log(error);
    })
}