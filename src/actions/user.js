import Config from '../../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { getConversationHistory, fetchSocket, createConversation, createWidgetChannel, fetchChannels } from './channels'
import { createMessage } from './messages'

function fetchGuestToken(data) {
  return fetch( Config.app + '/guest.token', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * [fetchUserInfo description]
 * @param  {[Object]} token [token object]
 * @return {[Promise]}
 */
export function fetchUserInfo(token) {
  return dispatch => {
    return fetch( Config.api + '/users.me', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token,
      }
    }).then(response => response.json()).then(json => {
      console.log(json)
      json.guest ? dispatch(receiveGuestInfo(json)) :
      dispatch(receiveUserInfo(json))
    }, error => {
      dispatch({type: "ERROR_FETCHING_USER_INFO"})
      throw error
    })
  }
}

/**
 * [registerGuestInfo description]
 * @param  {[Object]} data [This data object can include things like email, first name and last name]
 * @return {[Promise]}      [value is the token object]
 */
export function registerGuestInfo(data) {
  return dispatch => {
    if (typeof(Storage) !== "undefined") {
      let token = JSON.parse(localStorage.getItem("guest")) || JSON.parse(localStorage.getItem("token"))
      if(!token) {
        return fetchGuestToken(data).then(response => response.json())
          .then(json => {
            if(json.ok) {
              let token = json.token;
              console.log(token)
              localStorage.setItem("guest", JSON.stringify(token))
              dispatch(fetchUserInfo(token))
              dispatch({type: 'TOKEN_SET', token})
              dispatch(createWidgetChannel(token))
              dispatch(fetchSocket(token))
            }
            return token
          },
            error => {
              dispatch({type: 'FETCH_TOKEN_ERROR', error})
              throw error
            })
      } else {
        console.log("new flow still works m8 for - else")
        dispatch(fetchUserInfo(token))
        dispatch({type: 'TOKEN_FROM_LOCAL_STORAGE', token})
        dispatch(fetchChannels(token))
        dispatch(fetchSocket(token))
        return Promise.resolve(token)
      }
    } else {
      dispatch({type: "HTML5_LOCAL_STORAGE_NOT_SUPPORTED"})
      throw error
    }
  }
}

function receiveUserInfo(data) {
  return {
    type: "RECEIVED_USER_INFO", data
  }
}

function receiveGuestInfo (data) {
  return {
    type: "RECEIVED_GUEST_INFO", data
  }
}
