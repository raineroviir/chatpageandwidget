const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
import urlConfig from '../../url-config';
import { browserHistory } from 'react-router';
import ApiService  from '../../api.service';

export function initWidgetConfig( channelid ) {
    return dispatch => (
        ApiService.api( {
          action: "widget.details",
          payload: {
            channel_id: channelid
          }
        } )
        .then( res => {
            dispatch({
              type: 'WIDGET_UPDATE_KEY',
              key: 'isNewChannelConfig',
              value: !(res && res.channelid)
            })

            dispatch({
              type: 'INIT_WIDGET_CONFIG',
              data: res,
              channelid: channelid
            })
          },
          err => {  
            console.log('Error: ', err );
          }
        )
    )
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

export function saveWidgetConfig( config, channelid, isNewChannelConfig ) {
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
          })
        }
        let message = 'Updated Successfully';
        if( isNewChannelConfig ) {
          message = 'Created Successfully';
        }
        alert( message );
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
