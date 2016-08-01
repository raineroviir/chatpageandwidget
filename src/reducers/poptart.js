const initialState = {
    showPoptart: false
};

export function poptart(state = initialState, action) {
  switch (action.type) {
    case 'SET_COMPONENT': 
        return {
            ...state,
            component: action.component,
            showPoptart: true
        }
    case 'HIDE_POPTART' : 
        return {
            ...state,
            showPoptart: false   
        }
    default:

    return state;
  }
}
