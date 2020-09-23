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