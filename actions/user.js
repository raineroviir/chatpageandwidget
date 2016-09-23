import Config from '../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { getConversationHistory, fetchSocket, createConversation, createWidgetChannel, fetchChannels } from './channels'
import { createMessage } from './messages'
import * as types from '../types'

function fetchGuestToken(data) {
  return fetch( Config.app + '/guest.token', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export function fetchUserInfo(token) {
  if (typeof(Storage) !== "undefined" && !token) {
    token = JSON.parse(localStorage.getItem("token")) || {};
    console.log(token)
  }
  return fetch( Config.api + '/users.me', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}

/**
 * [checkForToken looks for a token in local storage]
 * @return {[Boolean]}
 */
function checkForToken() {
  if (!JSON.parse(localStorage.getItem("guest")) || !JSON.parse(localStorage.getItem("token"))) {
    return false
  }
}

export function registerGuestInfo(data) {
  return dispatch => {
    let token = JSON.parse(localStorage.getItem("guest"))
    if(!token) {
      fetchGuestToken(data).then(response => response.json())
        .then(json => {
          if(json.ok) {
            let token = json.token;
            console.log(token)
            localStorage.setItem("guest", JSON.stringify(token))
            dispatch({type: 'TOKEN_SET', token})
            dispatch(createWidgetChannel(token))
            dispatch(fetchSocket(token))
          }
        })
    } else {
      dispatch({type: 'TOKEN_FROM_LOCAL_STORAGE', token})
      dispatch(fetchChannels(token))
      dispatch(fetchSocket(token))
    }
  }
}

function setGuestUserId (user_id) {
  return {
    type: "SET_GUEST_ID",
    posts: { user_id },
    receivedAt: Date.now()
  }
}
