import Config from '../../common/config';
import fetch from 'isomorphic-fetch';

export function getChatPage(channel_id, token) {
  return dispatch => {
    dispatch({type: "FETCHING_CHATPAGE_BY_CHANNEL_ID"})
    return fetch( Config.app + '/chat-page?channel_id=' + channel_id, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json()
    }).then(json => dispatch({type: "INIT_CHATPAGE_CONFIG_INITIAL_STATE", chatpageConfig: json, channelId: channel_id}),
    error => {
      dispatch({type: "ERROR_FETCHING_CHATPAGE_BY_CHANNEL_ID"})
      throw error
    }).catch(error => console.log(error))
  }
}
