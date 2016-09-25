import ApiService  from '../../api.service';

export function  getTransactionHistory( month, callback ) {
  return dispatch => {
    dispatch({
      type: 'SHOW_LOADER'
    });
    ApiService.api({
      action: "widget.plans.transactions.history",
      payload: {
        month: month
      }
    })
    .then( 
      res=> {
        dispatch({
          type: 'HIDE_LOADER'
        });
        callback( 'success', res );
      }, 
      err => {
        dispatch({
          type: 'HIDE_LOADER'
        });
        callback( 'error', err );
      }
    )
  }
}