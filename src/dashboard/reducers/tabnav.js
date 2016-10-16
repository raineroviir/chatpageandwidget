const initialState = {
    menuState: false 
};

export function tabnav(state = initialState, action) {

  switch (action.type) {
    case 'TAB_NAV_STATE': 
        return {
            ...state,
            menuState: action.state
            
        }
    default: 
    return state;
  }
}
