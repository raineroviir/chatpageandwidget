const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
import urlConfig from '../../url-config';

export function initWidget( channelid ) {
    
    return dispatch => (
        getWidgetConfig( channelid )
        .then(
          ( response ) => {
            if (response.status == 401) {
              window.location.hash = "#";
            } 
            return response.json();
          }
        ).then( json => {
            dispatch({
              type: 'INIT_WIDGET',
              data: json
            })
        })
    )
}

export function saveWidget( config, channelid ) {
  return dispatch => (
      saveWidgetConfig( config, channelid )
        .then(
          ( response ) => {
            if (response.status == 401) {
              window.location.hash = "#";
            } 
            return response.json();
          }
        ).then( json => {
          alert( 'Successfully saved' );
            /*dispatch({
              type: 'INIT_WIDGET',
              data: json
            })*/
        })
  )
}

export function updateKey ( obj ) {
  return dispatch => (
        dispatch({
          type: 'UPDATE_KEY',
          key: obj.key,
          value: obj.value
        })
    )
}
function  getWidgetConfig ( channelid ) {
    if (typeof(Storage) !== "undefined") {
        var token = JSON.parse(localStorage.getItem("token"));
    }
    return fetch( 'http://ec2-54-169-64-117.ap-southeast-1.compute.amazonaws.com:3333/v1/channels.widget?channel_id=' + channelid, {
      method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
      } 
    })  
}
function  saveWidgetConfig ( config, channelid ) {
    if (typeof(Storage) !== "undefined") {
        var token = JSON.parse(localStorage.getItem("token"));
    }
    return fetch( 'http://ec2-54-169-64-117.ap-southeast-1.compute.amazonaws.com:3333/v1/channels.widget.update', {
      method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
      },
      body: JSON.stringify( {
        channel_id: channelid,
        widget_configuration: config
      }) 
    })  
}