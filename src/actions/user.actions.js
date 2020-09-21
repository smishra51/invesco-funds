import { loginService } from '../services/';
import { history } from '../helpers';
import CONSTANT from '../config/constant'
export const userActions = {
    login,
    logout
};
function login(username, password) {
    return dispatch => {
        let payload = {
            email: username,
            password: password
        }
        dispatch(disabledLogin(true));
        loginService.post(payload)
            .then((response) => {
                if (response.data['access-token']) {
                    let token = response.data['access-token'];
                    userInfo(token).then(resp => {
                        const claims = resp.data;
                        if (claims) {
                            localStorage.setItem('token', token);
                            localStorage.setItem('auth', true);
                            localStorage.setItem('userName', claims.firstName + ' ' + claims.lastName);
                            localStorage.setItem('userId', 1);
                            dispatch(setUserDetails(token, claims));
                            history.push('/dashboard');
                        }

                    }).catch(err => {
                        console.log('login Failed', err.message)
                        dispatch(invalidlogin());
                    })
                }
            }).catch(err => {
                console.log('login Failed')
                dispatch(invalidlogin());
            })
    };
}

function logout() {
    return dispatch => {
        localStorage.clear()
        dispatch(logoutUser());
        history.push('/');
    }
}

function invalidlogin() {
    return dispatch => {
        dispatch(loginFailed());
        history.push('/');
    }
}


function disabledLogin(disable) {
    return dispatch => {
        dispatch(disableLogin(disable));
    }
}
export function setUserDetails(token, userClaims) {
    return {
        type: "LOGIN_SUCCESS",
        auth: true,
        token: token,
        userName: userClaims.firstName + ' ' + userClaims.lastName,
        userId: 1
    }
}
export function logoutUser() {
    return {
        type: "LOGOUT_SUCCESS",
        auth: false,
        token: '',
        userClaims: ''
    }
}

export function loginFailed() {
    return {
        type: "LOGIN_FAILED",
        disabled:false,
        erroMessage: CONSTANT.LOGIN_ERROR_MESSAGE

    }
}

export function disableLogin(disable) {
    return {
        type: "LOGIN_FAILED",
        disabled:true
    }
}

async function userInfo(token) {
    const resp = await loginService.getUserDetails(token);
    return resp;
}
