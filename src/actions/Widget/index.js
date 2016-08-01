const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
import urlConfig from '../../url-config';
import { browserHistory } from 'react-router';
import ApiService  from '../../api.service';



export function initWidgetConfig( channelid ) {
    return ( dispatch, getState ) => {
      let state = getState();
      return (
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
            })
          },
          err => {  
            /*dispatch({
              type: 'INIT_WIDGET_CONFIG',
              channelid: channelid
            })*/
          }
        )
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

  return dispatch => (
      ApiService.api({
        action : method,
        payload: payload
      })
      .then( json => {
        if( isNewChannelConfig ) {
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
        })
        browserHistory.push("/dashboard/" + activeChannelName );
        //alert( message );
      })
  )
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