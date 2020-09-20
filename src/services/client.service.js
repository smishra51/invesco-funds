// import config from '../config/config';
// import axios from 'axios';
import resp from '../helpers/clients.json';
export const clientService = {
  get
};
function get() {
    return new Promise((resolve, reject) => {
        if ( resp) {
          resolve(resp);
        } else {
          reject(Error("It broke"));
        }
      });
    }

// function get() {
//   const header = {
//     headers: {
//       'Content-Type': 'application/json',
//       'x-api-key': config.apiKey,
//       'Authorization': 'Bearer ' + localStorage.getItem('token')
//     }
//   };
//   return axios.get(config.baseUrl + config.cliets.getAllClients, header).then((response) => {
//     return response;
//   }).catch((err) => {
//     console.log(err);
//   })
// }
