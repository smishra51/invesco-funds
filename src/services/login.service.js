import axios from 'axios';
import config from '../config/config';

export const loginService = {
    post,getUserDetails
};

function post(payload){
    return axios.post(config.authUrl, payload).then((response)=>{
        return response;
    })
}

 function getUserDetails(token) {
    const authHeader = {
        headers: {
            'Authorization' : 'Bearer ' +token
        }
    };
    return axios.get(config.baseUrl+config.userDetails,authHeader).then((response)=>{
        return response;
    })

}