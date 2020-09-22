import config from '../config/config';
import axios from 'axios';

export const fundService = {
    get, getById,getByName,post,put
};

function get() {
  return axios.get(config.baseUrl + config.funds.getAllfunds).then((response) => {
    return response;
  }).catch((err) => {
    console.log(err);
  })
}
function getById(fundId) {
  return axios.get(`${config.baseUrl+config.funds.getAllfunds}?fundId=${fundId}`).then((response) => {
    return response;
  });
}

function getByName(fundName) {
  return axios.get(`${config.baseUrl+config.funds.getAllfunds}?fundName=${fundName}`).then((response) => {
    return response;
  });
}

function post(payload) {
  return axios.post(config.baseUrl+config.funds.getAllfunds, payload).then((response) => {
      return response;
  }).catch((err) => {
      console.log(err);
  })
}

function put(payload) {
  return axios.put(config.baseUrl+config.funds.getAllfunds, payload).then((response) => {
      return response;
  }).catch((err) => {
      console.log(err);
  })
}