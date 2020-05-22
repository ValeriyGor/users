import axios from 'axios'
import store from '../store';


export function getAllUsers() {
    return new Promise((res, rej) => {
        axios.get(store.state.api_url + '/users', store.state.credentials)
            .then(function (response) {
                res({
                    data: response.data
                })
            })
            .catch(function (error) {
                rej(error.response);
            });
    });
}
