const initialState = {
    showLoader: false
};

export function loader(state = initialState, action) {
  
  switch (action.type) {

    case 'SHOW_LOADER': 
        return {
            ...state,
            showLoader: true
        }
    case 'HIDE_LOADER' : 
        return {
            ...state,
            showLoader: false   
        }
    default:
        return state;
  }

}
