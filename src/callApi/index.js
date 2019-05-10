import {axios} from '../import';
const url = 'http://laravel.cc';

export default function index(endpoint, method, body) {
    return axios({
        url: url + '/' + endpoint,
        timeout: 20000,
        method: method,
        data: body
    }).catch( (error) => {
        console.log(error);
    })
}