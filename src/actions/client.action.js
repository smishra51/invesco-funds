import { clientService } from '../services/';
export const clientActions = {
    getClients
};
function getClients(){
    return dispatch => {
       clientService.get()
       .then((response)=>{
             dispatch(setClients(response.data));
       }).catch(err => {
            console.log(err.message)
       })
    };
}
export function setClients(data){
      return{
          type: "CLIENT_LIST",
          clients: data
      }
}