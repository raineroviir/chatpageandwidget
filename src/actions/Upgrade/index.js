import ApiService  from '../../api.service';

export function updateUpgradePlanKey( obj ) {
  
  return dispatch => (
        dispatch({
          type: 'UPGRADE_PLAN_UPDATE_KEY',
          newState: obj
        })
    )
}


export function  getTeamMemberCount() {
  return dispatch => {
    ApiService.api({
      action: "api.team.members-list"
    })
    .then( 
      res=> {
        console.log( 'Res...' , res );
      }, 
      err => {
        console.log( 'Error...' , err );
      }
    )
  }
}

export function submitPayment (form, settings, callback ) {
    
    return dispatch => (


        Stripe.card.createToken(form, (status, res) => {
            let newState = {};

            if( res&&res.error ) {
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
                  callback( 'success', res );
                },
                err => {
                  callback( 'error', err.message );
                }
              )
            }
            

            
        })
    )
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

    ApiService.api({
      action: "widget.coupon-validate",
      payload: {
        coupon: coupon
      }
    }).then(
      res=> {
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
        console.log( 'Error', err );
      }
    )
  }
}



export function getPlanDetails() {
  return dispatch => {
    ApiService.api({
      action: "widget.plan-list"
    })
    .then(
      res => {
        dispatch({
          type: 'UPGRADE_PLAN_UPDATE_KEY',
          newState: {
            plans: res.plans.sort( (a,b) => a.amount > b.amount)
          }
        }) 
        //console.log( 'plan-list', res );
      },
      err => {
        console.log( 'Err', err );
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

