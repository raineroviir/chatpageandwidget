import Config from '../../common/config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

/**
 * [getWidget description]
 * @param  {[String or Number]} channel_id
 * @param  {[String or Number]} channel_url
 * @param  {[String]} token
 * @return {[Promise]}
 */
export function getWidget(channel_id, channel_url, token) {
  console.log(channel_id, channel_url, token)
  if (channel_id) {
    return dispatch => {
      dispatch({type: "FETCHING_WIDGET_BY_CHANNEL_ID"})
      return fetch( Config.app + '/widgets?channel_id=' + channel_id, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token || token,
        }
      }).then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json()
}).then(json => dispatch({type: "INIT_WIDGET_CONFIG_INITIAL_STATE", widgetConfig: json, channelId: channel_id}),
      error => {
        dispatch({type: "ERROR_FETCHING_WIDGET_BY_CHANNEL_ID"})
        throw error
      }).catch(error => console.log(error))
    }
  } else {
    return dispatch => {
      dispatch({type: "FETCHING_WIDGET_BY_CHANNEL_URL"})
      return fetch( Config.app + '/widgets?channel_url=' + channel_url, {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token || token,
        }
      }).then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json()
}).then(json => dispatch({type: "INIT_WIDGET_CONFIG_INITIAL_STATE", widgetConfig: json, channelUrl: channel_url}),
      error => {
        dispatch({type: "ERROR_FETCHING_WIDGET_BY_CHANNEL_URL"})
        throw error
      }).catch(error => console.log(error))
    }
  }
}
