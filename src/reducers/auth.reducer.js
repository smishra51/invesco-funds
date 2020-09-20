let token = localStorage.getItem('token');
let auth = localStorage.getItem('auth');
let userName = localStorage.getItem('userName');
let userId = localStorage.getItem('userId');

const initialState = auth ? { loggedIn: true, auth, token, errorMessage : "",userName,userId} : { loggedIn: false ,errorMessage:"",userId:'',userName:''};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                loggingIn: true,
                auth: action.auth,
                token: action.token,
                userName: action.userName,
                userId: action.userId
            };
        case 'LOGOUT_SUCCESS':
            return {
                auth: false
            };
        case 'LOGIN_FAILED':
            return {
                auth: false,
                errorMessage: action.erroMessage
            };
        default:
            return state
    }
}