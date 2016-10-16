
export function setPoptartComponent( component ) {
    return dispatch => (
        dispatch({
          type: 'SET_COMPONENT',
          component: component
        })
    )
}

export function hidePoptart ( ) {
    return dispatch => (
        dispatch({
          type: 'HIDE_POPTART'
        })
    )   
}

