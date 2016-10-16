

export function setTabNavState( state ) {

  return ( dispatch ) => {
    dispatch({
        type: 'TAB_NAV_STATE',
        state
    });
  }
    
}