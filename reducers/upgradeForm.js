const initialState = {
    promoCode: '',
    cardLogo: '',
    cardNumber: '',
    promoStatus: '',
    expDate: '',
    cvcNumber: '',
    promoBtnState: false,
    couponReqStatus: false // true if any active request 
};

export function upgradeForm(state = initialState, action) {

    switch (action.type) {
        
        case 'UPGRADE_FORM_UPDATE_KEY': {
            return {
                ...state,
                ...action.newState
            }
        }

        case 'UPGRADE_FORM_RESET': {
            return initialState
        }

      default: return state;
    }
}