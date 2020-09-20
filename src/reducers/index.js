import { combineReducers } from 'redux';
import { authentication } from './auth.reducer';
import { fund } from './funds.reducer';
import {clients} from './client.reducer';
const rootReducer = combineReducers({
    authentication,fund,clients
});
export default rootReducer;