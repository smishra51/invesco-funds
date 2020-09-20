const initialState = {
    funds: [],
    loading: false,
    isOpen: false,
    status: false
};

export function fund(state = initialState, action) {
    switch (action.type) {
        case 'GET_FUNDS':
            return {
                ...state,
                funds: action.funds,
            };
        case 'BEFORE_DISPATCH':
            return {
                ...state,
                loading: action.loading,
            };
        case 'TOGGLE_MODEL':
            return {
                ...state,
                isOpen: action.isOpen,
            };
        case 'FUND_STATUS':
            return {
                ...state,
                status: action.status,
            };
        default:
            return state
    }
}