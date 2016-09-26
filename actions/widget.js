import Config from '../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

export function getWidget(channel_id, channel_url, token) {
  if (!token) {
    let token = JSON.parse(localStorage.getItem("guest")).access_token
  }
  return dispatch => {
    dispatch({type: "FETCHING_WIDGET"})
    return fetch( Config.app + '/widgets?channel_id=' + channel_id, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(response => response.json()).then(json => dispatch({type: "INIT_WIDGET_CONFIG_INITIAL_STATE", json}))
  }
}
