const initialState = {
    outstandingAmount: false,
    cardLastDigits: false,
    nextBilling: false
};

export function billingInfo(state = initialState, action) {

  switch (action.type) {
    case 'BILLING_INFO_SET_STATE': 
        return {
            ...state,
            ...action.newState
        };
    default: 
    return state;
  }
}
