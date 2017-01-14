import ApiService  from '../../api.service';
import { populateUserInfo } from '../Navigation';

export function updateEditSettings( key, value ) {
  
    return dispatch => {
        dispatch({
            type: 'UPDATE_EDIT_SETTINGS',
            newState: {
                [ key ] : value
            }
        })
    }
}


export function saveSettings( settings, chat_center_domain, callback ) {
    let apiCallCount = 1;
    if( settings.team_id )  {
        apiCallCount = 2;
    }
    return dispatch => {
        
        dispatch({
            type: 'SETTINGS_SET_STATE',
            newState: {
                errorMessage: false
            }
        });

        let count = 0;
        let successHandler = ( res ) => {
            count++;
            if( count === apiCallCount ) {
                dispatch({
                    type: 'HIDE_LOADER'
                });
                dispatch({
                    type: 'SETTINGS_SET_STATE',
                    newState: {
                        errorMessage: false,
                        initialized: false
                    }
                });
                dispatch(populateUserInfo());
                callback('success');

            }    
            


        };

        let errorHandler = ( err ) => {
            count++;
            dispatch({
                type: 'HIDE_LOADER'
            });

            if( count === apiCallCount ) {
                callback('error', err);
            }

        };

        dispatch({
            type: 'SHOW_LOADER'
        });

        if( apiCallCount === 2 ) {

            let payload = {
                full_name: settings.organizationName,
                team_id: settings.team_id
            };
            if( chat_center_domain ) {
                payload.domain = settings.ccdomain + '.' + window.config.cc;
            } else {
                payload.domain = settings.ownDomain;
            }
            payload.avatar = settings.org_avatar;

            let data = new FormData();
            data.append('full_name',payload.full_name);
            data.append('team_id',payload.team_id);
            data.append('domain',payload.domain);

            if( typeof settings.org_avatar === 'object' ) {
                data.append('avatar', settings.org_avatar);
            }
            
            ApiService.api({
              action: "api.settings.organization-update",
              payload: payload,
              headers: {
                "enctype":"multipart/form-data"
              }
            })
            .then( 
              successHandler,
              errorHandler
            );

        }

        let data = {};
        data.first_name = settings.first_name;
        data.last_name = settings.last_name;
        data.email = settings.email;
        data.personal_chat_address = settings.personal_chat_address;
        if( typeof settings.personal_avatar_upload === 'object' ) {
            data.avatar =  settings.personal_avatar_upload;
        }
        ApiService.api({
          action: "api.settings.personnal-update",
          payload: data,
          headers: {
            "enctype":"multipart/form-data"
          }
        })
        .then( 
          successHandler,
          errorHandler
        );


    }
}


export function toggleUseDomain( value ) {
    return dispatch => {
        dispatch({
            type: 'SETTINGS_SET_STATE',
            newState: {
                chat_center_domain : value
            }
        })
    }
}

export function setSettingsState( newState ) {
    return dispatch => {
        
        dispatch({
            type: 'SETTINGS_SET_STATE',
            newState
        });
    }
}


export function deleteOrganization( team_id, callback ) {
    return dispatch => {
        dispatch({
            type: 'SHOW_LOADER'
        });
   
        ApiService.api({
          action: "api.teams.delete",
          payload: {
            team_id: team_id
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
            callback( 'error', err );
          }
        );
    }
}

export function changePassword( payload, callback ) {
    return dispatch => {
        dispatch({
            type: 'SHOW_LOADER'
        });
   
        ApiService.api({
          action: "api.users.password.change",
          payload: payload
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
            callback( 'error', err );
          }
        );
    }
}


export function getBillingDetails() {
    return (dispatch) => {
        dispatch({
            type: 'SHOW_LOADER'
        });
        ApiService.api({
          action: "widget.plans.outstandingAmount"
        })
        .then(res=>{
            dispatch({
                type: 'BILLING_INFO_SET_STATE',
                newState: {
                    outstandingAmount: res.amount    
                }
            });
        },err=>{
            
        });

        ApiService.api({
          action: "widget.billing.info"
        })
        .then(res=>{
            if( res.message ) {
                dispatch({
                    type: 'BILLING_INFO_SET_STATE',
                    newState: {
                        cardLastDigits: res.message.card_last_4_digits,
                        nextBilling: res.message.billing_cycle[1]
                    }
                });    
            }
            dispatch({
                type: 'HIDE_LOADER'
            });
        },err=>{
            dispatch({
                type: 'HIDE_LOADER'
            });
        });
    };
}