import Config from '../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { getConversationHistory, fetchSocket, createConversation, createWidgetChannel, fetchChannels } from './channels'
import { createMessage } from './messages'
import * as types from '../types'

function fetchGuestToken(data) {
  return fetch( 'https://app-beta.chat.center/v1/guest.token', {
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

/**
 * [setOrGetGuestToken description]
 * @param {[Object]} data [NOTE: 'email' attribute required]
 * @return {[Object]}
 */
export function setOrGetGuestToken(data = {email: "placeholder"}) {
  return dispatch => {
    if(checkForToken() === false) {
      fetchGuestToken(data).then(response => response.json())
        .then(json => {
          if(json.ok) {
            let token = json.token;
            localStorage.setItem("guest", JSON.stringify(token))
            dispatch({type: 'TOKEN_SET', token})
            let channelid = 179
            // dispatch(createConversation(channelid, token))
          }
        })
    } else {
      let token = JSON.parse(localStorage.getItem("guest"))
      let channelid = 179
      dispatch({type: 'TOKEN_SET', token})
      // dispatch(createConversation(channelid, token))
    }
  }
}

function checkForGuestChannel() {
  if (!JSON.parse(localStorage.getItem("guestchannel"))) {
    return false
  }
}

export function createOrGetChannel(token) {
  return dispatch => {
    if (checkForGuestChannel() === false) {
      return dispatch(createWidgetChannel(token))
    } else {
      return localStorage.getItem("guestchannel")
    }
  }
}

export function registerGuestInfo(data) {
  return dispatch => {
    let token = dispatch(setOrGetGuestToken(data))
    dispatch(fetchSocket(token))
    dispatch(createWidgetChannel(token))
    // console.log(conversationid)
      // .then(json => {
      //   if(json.ok){
      //     let token = json.token;
      //     localStorage.setItem("guest", JSON.stringify(token));
      //     // Initialize Guest socket
      //     dispatch(fetchSocket(token));
      //
      //     // Initialize send message
      //     if(localStorage.getItem("guestFirstMessage")){
      //       let guestFirstMessage = JSON.parse(localStorage.getItem("guestFirstMessage"));
      //       dispatch(createMessage(guestFirstMessage.message, guestFirstMessage.conversationid));
      //       localStorage.removeItem("guestFirstMessage");
      //
      //       // Get Conversation History
      //       dispatch(getConversationHistory(guestFirstMessage.conversationid, token));
      //     }
      //
      //     // Get Guest User info
      //     fetchUserInfo(token).then(response => response.json()).then(json => {
      //       let guest = JSON.parse(localStorage.getItem("guest"));
      //       localStorage.setItem("guest", JSON.stringify({...guest, user_id: json.guest.id}));
      //       json.ok && dispatch(setGuestUserId(json.guest.id))
      //     })
      //   }
      //   $("#guest_modal_dismiss").click();
      // })
  }
}

function setGuestUserId (user_id) {
  return {
    type: "SET_GUEST_ID",
    posts: { user_id },
    receivedAt: Date.now()
  }
}
