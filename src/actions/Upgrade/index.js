import ApiService  from '../../api.service';

export function updateUpgradePlanKey( obj ) {
  
  return dispatch => (
        dispatch({
          type: 'UPGRADE_PLAN_UPDATE_STATE',
          newState: obj
        })
    )
}


export function  getTeamMemberCount() {
  return dispatch => {
    ApiService.api({
      action: "api.teams.members-list"
    })
    .then( 
      res=> {
        dispatch({
          type: 'UPGRADE_PLAN_UPDATE_STATE',
          newState: {
            memberCount: ( res && res.users && res.users.length || 2 )
          }
        });
        //console.log( 'Res...' , res );
      }, 
      err => {
        console.log( 'Error...' , err );
      }
    )
  }
}

export function submitPayment (form, settings, callback ) {
    
    return dispatch => {
      dispatch({
        type: 'SHOW_LOADER'
      });
      Stripe.card.createToken(form, (status, res) => {
        let newState = {};

        if( res&&res.error ) {
          dispatch({
            type: 'HIDE_LOADER'
          });
          callback( 'error', res.error.message );
        } else {
          newState.stripeToken = res && res.id;
          if( !newState.stripeToken ) {
            return;
          }
          ApiService.api({
            action: "widget.plans-switch",
            payload: {
              "stripe_email": settings.emailId,
              "stripe_token": newState.stripeToken,
              "plan_id": settings.plan_id,
              "coupon": settings.coupon
            }
          })
          .then( 
            res => {
              dispatch({
                type: 'HIDE_LOADER'
              });
              callback( 'success', res );
            },
            err => {
              dispatch({
                type: 'HIDE_LOADER'
              });
              callback( 'error', err.message );
            }
          )
        }            
      })
    }

}



export function  updateUpgradeFormKey( obj ) {

    return dispatch => (
        
        dispatch({
          type: 'UPGRADE_FORM_UPDATE_KEY',
          newState: obj
        })
        
    )
}


export function validateCoupon ( coupon ) {

  return dispatch => {
    dispatch({
      type: 'SHOW_LOADER'
    });
    ApiService.api({
      action: "widget.coupon-validate",
      payload: {
        coupon: coupon
      }
    }).then(
      res=> {
        dispatch({
          type: 'HIDE_LOADER'
        });
        dispatch({
          type: 'UPGRADE_FORM_UPDATE_KEY',
          newState : {
            promoStatus : 'success',
            couponReqStatus: false     
          }
        })
      },
      err =>{
        if( err.error ) {
          dispatch({
            type: 'UPGRADE_FORM_UPDATE_KEY',
            newState: {
              'promoStatus': 'error',
              'promoError': err.error,
              couponReqStatus: false
            }
          });
        }
        dispatch({
          type: 'HIDE_LOADER'
        });
        //console.log( 'Error', err );
      }
    )
  }
}



export function getPlanDetails() {
  
  return dispatch => {

    dispatch({
      type: 'SHOW_LOADER'
    });
    dispatch({
      type: 'UPGRADE_PLAN_UPDATE_STATE',
      newState: {
        error: false,
        requestStatus: 'loading'
      }
    });

    ApiService.api({
      action: "widget.plan-list"
    })
    .then(
      res => {
        let plans = {
          month: [],
          year: []
        };
        for( let plan in res.plans ) {
          let planItem = res.plans[ plan ];
          if( planItem.interval === 'month' ) {
            plans.month.push( planItem );
          } else {
            plans.year.push( planItem );
          }
        }
        plans.month = plans.month.sort( (a, b) => a.amount > b.amount );
        plans.year = plans.year.sort( (a, b) => a.amount > b.amount );
        
        dispatch({
          type: 'UPGRADE_PLAN_UPDATE_STATE',
          newState: {
            plans: plans,
            requestStatus: 'loaded'
          }
        }) ;
        dispatch({
          type: 'HIDE_LOADER'
        }); 
      },
      err => {
        console.log( 'Err', err );
        dispatch({
          type: 'HIDE_LOADER'
        }); 
        dispatch({
          type: 'UPGRADE_PLAN_UPDATE_STATE',
          newState: {
            error: err.error,
            requestStatus: 'error'
          }
        });
      }
    )

  }
}


export function  resetUpgradeForm() {
  return dispatch => (
        dispatch({
          type: 'UPGRADE_FORM_RESET'
        })
    )
}


export function  updateUpgradeSource( source ) {
  return (dispatch) => {
    dispatch({
      type: 'UPGRADE_PLAN_UPDATE_STATE',
      newState : {
        source
      }
    })
  }
}




