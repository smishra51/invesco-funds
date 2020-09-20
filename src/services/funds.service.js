import config from '../config/config';
import axios from 'axios';
export const fundService = {
    get, getById,getByName,post
};



function get() {
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  };
  return axios.get(config.baseUrl + config.funds.getAllfunds, header).then((response) => {
    return response;
  }).catch((err) => {
    console.log(err);
  })
}
function getById(fundId) {
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  };
  return axios.get(`${config.baseUrl+config.funds.getAllfunds}?fundId=${fundId}`, header).then((response) => {
    return response;
  });
}

function getByName(fundName) {
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  };
  return axios.get(`${config.baseUrl+config.funds.getAllfunds}?fundName=${fundName}`, header).then((response) => {
    return response;
  });
}

function post(payload) {
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  };
  return axios.post(config.baseUrl+config.funds.getAllfunds, payload, header).then((response) => {
      return response;
  }).catch((err) => {
      console.log(err);
  })
}