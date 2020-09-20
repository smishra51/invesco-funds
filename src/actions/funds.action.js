import { fundService } from '../services';
import { history } from '../helpers';
import httpStatus from '../config/constant'

export const fundsActions = {
    getFunds,
    getFundDetailsById,
    getFundDetailsByName,
    toggleFundModel,
    createFunds
};

function getFunds(payload) {
    return dispatch => {
        dispatch(isLoading(true))
        fundService.get(payload)
            .then((response) => {
                dispatch(setFunds(response.data));
                dispatch(isLoading(false))
                history.push('/dashboard');
            }).catch(err => {
                console.log('error', err.message)
            })
    };
}

function getFundDetailsById(fundId) {
    return dispatch => {
        dispatch(isLoading(true))
        fundService.getById(fundId)
            .then((response) => {
                dispatch(setSingleFunds(response.data));
                dispatch(isLoading(false))
                history.push('/dashboard');
            }).catch(err => {
                console.log('error', err.message)
            })
    };
}

function getFundDetailsByName(fundName) {
    return dispatch => {
        fundService.getById(fundName)
            .then((response) => {
                dispatch(setSingleFunds(response.data));
                history.push('/dashboard');
            }).catch(err => {
                console.log('error', err.message)
            })
    };
}

function createFunds(clients,fundName,sharesOwned,marketValue,pricePerShare,expiryDate){
    return dispatch => {
        let payload = {
            clients:clients,
            fund_name: fundName,
            market_value: marketValue,
            price_per_share: pricePerShare,
            expiry_dt: expiryDate,
            shares_owned: sharesOwned,
            created_by: 1,
            status: 'ACTIVE'
        }
        fundService.post(payload)
        .then((response)=>{
            response.status === httpStatus.SUCCESS ? dispatch(setStatus(true)) :dispatch(setStatus(false));
            history.push('/dashboard');
        }
        )
    };
}

function toggleFundModel(action) {
    return dispatch => {
        dispatch(toggleAction(action))
    };
}

export function toggleAction(action) {
    return {
        type: "TOGGLE_MODEL",
        isOpen: action
    }
}
export function setFunds(funds) {
    return {
        type: "GET_FUNDS",
        funds: funds
    }
}
export function setSingleFunds(funds) {
    return {
        type: "GET_FUNDS",
        funds: [funds]
    }
}

export function isLoading(val) {
    return {
        type: 'BEFORE_DISPATCH',
        loading: val
    }
}

export function setStatus(status) {
    return {
        type: 'FUND_STATUS',
        status: status
    }
}