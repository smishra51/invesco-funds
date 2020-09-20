import axios from 'axios';
import config from '../config/config';

export const loginService = {
    post,getUserDetails
};
const header = {
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.apiKey
    }
};

function post(payload){
    return axios.post(config.authUrl, payload, header).then((response)=>{
        return response;
    })
}

 function getUserDetails(token) {
    const authHeader = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.apiKey,
            'Authorization' : 'Bearer ' +token
        }
    };
    return axios.get(config.baseUrl+config.userDetails,authHeader).then((response)=>{
        return response;
    })

}