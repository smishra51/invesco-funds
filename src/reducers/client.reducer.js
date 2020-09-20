const initialState = {
    clients: [],
};

export function clients(state = initialState, action) {
    switch (action.type) {
        case 'CLIENT_LIST':
            return {
                ...state,
                clients: action.clients
            };
        default:
            return state
    }
}