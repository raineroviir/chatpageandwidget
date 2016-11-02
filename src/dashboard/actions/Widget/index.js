const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
import Config from '../../config';
import { browserHistory } from 'react-router';
import ApiService  from '../../api.service';



export function initWidgetConfig( channelid ) {
    return ( dispatch, getState ) => {

      let state = getState();
      dispatch({
        type: 'SHOW_LOADER'
      });
      // initialize the error with empty
      dispatch({
        type: 'WIDGET_UPDATE_STATE',
        newState: {
          error: false
        }
      });
      ApiService.api( {
        action: "widget.details",
        payload: {
          channel_id: channelid
        }
      } )
      .then( res => {
          let plan = state.userinfo.userinfo.plan;
          let userPlan = 'free';
          if( plan && plan.stripe_id ) {
            userPlan = plan.stripe_id;
          } 
          
          if( res && res.channel ) {
            if( userPlan != 'premium' ) {
              res.ccBranding = false;
            }
          }

          dispatch({
            type: 'WIDGET_UPDATE_KEY',
            key: 'isNewChannelConfig',
            value: !(res && res.channel)
          })
          dispatch({
            type: 'INIT_WIDGET_CONFIG',
            data: res,
            channelid: channelid
          });
          dispatch({
            type: 'INIT_WIDGET_CONFIG_INITIAL_STATE',
            data: res
          });
          dispatch({
            type: 'HIDE_LOADER'
          });
        },
        err => {  
          dispatch({
            type: 'HIDE_LOADER'
          });

          dispatch({
            type: 'WIDGET_UPDATE_STATE',
            newState: {
              error: err.error
            }
          });
        }
      )
    }
}

export function updateWidgetKey( obj ) {
  return dispatch => (
        dispatch({
          type: 'WIDGET_UPDATE_KEY',
          key: obj.key,
          value: obj.value
        })
    )
}

export function saveWidgetConfig( config, channelid, isNewChannelConfig, activeChannelName ) {
  let payload = {
    channel_id: channelid,
    widget_configuration: config
  };
  let method = 'widget.update';
  if( isNewChannelConfig ) {
    method = 'widget.create';
  } 

 

  return dispatch => {

      dispatch({
        type: 'WIDGET_UPDATE_STATE',
        newState: {
          error: false
        }
      });
      dispatch({
        type: 'SHOW_LOADER'
      });
      ApiService.api({
        action : method,
        payload: payload
      })
      .then( json => {
        /*if( isNewChannelConfig ) {
          dispatch({
            type: 'WIDGET_UPDATE_KEY',
            key: 'isNewChannelConfig',
            value: false
          });
        }
        let message = 'Updated Successfully';
        if( isNewChannelConfig ) {
          message = 'Created Successfully';
        }
        dispatch({
          type: 'INIT_WIDGET_CONFIG_INITIAL_STATE',
          data: config
        })*/
        dispatch({
          type: 'HIDE_LOADER'
        });
        browserHistory.push("/dashboard/" + activeChannelName );
        //alert( message );
      }, err => {
        dispatch({
          type: 'HIDE_LOADER'
        });
        dispatch({
          type: 'WIDGET_UPDATE_STATE',
          newState: {
            error: err.error
          }
        });
      } )
  }
    
}

export function updateKey ( obj ) {
  return dispatch => (
        dispatch({
          type: 'WIDGET_CONFIG_UPDATE_KEY',
          key: obj.key,
          value: obj.value
        })
    )
}


export function updateWigetConfigState ( obj ) {
  return dispatch => (
        dispatch({
          type: 'WIDGET_CONFIG_UPDATE_STATE',
          newState: obj
        })
    )
}