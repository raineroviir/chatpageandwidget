import Config from '../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import { createConversation } from './channels'
import { setOrGetGuestToken } from './user'
import { getConversationHistory, setGuestConvid } from './channels'
var _ = require("lodash");

export function scrollCompleteForUserMessage() {
  return {
    type: "SCROLL_COMPLETE_FOR_NEW_USER_MESSAGE"
  }
}

export function scrollCompleteForMsgStream() {
  return {
    type: "SCROLL_COMPLETE_FOR_NEW_MESSAGE_STREAM"
  }
}

export function setOldestVisibleMessageUnixTimestamp(message) {
  console.log(message)
  const timestamp = moment(message.created_at).format("x")
  return {
    type: "SET_OLDEST_VISIBLE_MESSAGE_UNIX_TIME_STAMP", timestamp
  }
}
export function dispatchMessageStream(message) {
  return (dispatch, getState) => {
    console.log(message)
    const state = getState()
    const userid = state.user.data.id || state.guest.data.id
    if (message.user_id === userid) {
      return
    }
    if (state.environment.inactive) {
      dispatch({type: "MESSAGE_RECEIVED_FOR_INACTIVE_USER", message: message})
    }
    dispatch({type: "MESSAGE_STREAM",
    message: message,
    receivedAt: Date.now()})

  }
}

/**
 * [createMessage description]
 * @param  {[Object]} message
 * @param  {[Number]} conversationid
 * @param  {[String]} token
 * @param  {[Number]} channelid
 */
export function createMessage(message, conversationid, token, channelid, attachment) {
  return dispatch => {
  dispatch(addMessage(message))
  if (message.bot === true) {
    return
  }
  const messageText = message.text
  return postMessage(messageText, conversationid, token, channelid, attachment).then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json()
})
  .then(json => {
    dispatch({type: "MSG_SAVED_TO_SERVER", message})
  }).catch(error => console.log(error))
  }
}

/**
 * [postMessage description]
 * @param  {[String]} message        [description]
 * @param  {[Number]} conversationid [description]
 * @param  {[String]} access_token   [description]
 * @param  {[Number]} channelid      [description]
 * @return {[Promise]}                [description]
 */
function postMessage(message, conversationid, token, channelid, attachment) {
  return fetch( Config.api + '/messages.postMessage', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  token,
    },
    body: JSON.stringify({
      text: message,
      conversation_id: conversationid,
      channel_id: channelid,
      attachment: attachment
    })
  })
}

export function loadServerMsgs(messages) {
  return {
    type: "LOAD_MSG_HISTORY",
    messages
  }
}

function addMessage(message) {
  return {
    type: "ADD_LOCAL_MESSAGE",
    message: message,
    receivedAt: Date.now()
  }
}

function processAddMessage(response, conversationid) {
  if(conversationid && typeof Storage !== "undefined"){
    var guestMessages = JSON.parse(localStorage.getItem("guestMessages")) || {},
      url = window.location.href,
      channel = url.match(/\/([^\/]+)\/?$/),
      messages = guestMessages.messages || [];
    channel = (typeof channel[1] === "number") ? url.substr(0, url.length - channel[0].length).match(/\/([^\/]+)\/?$/)[1] : channel[1];

    guestMessages = _.uniqBy([...guestMessages, {channel, conversationid}] , "channel");
    localStorage.setItem("guestMessages", JSON.stringify(guestMessages));
  }
  return {
    type: "ADD_MESSAGE",
    message: response.message,
    receivedAt: Date.now()
  }
}

export function botReplyForFirstMessage(conversationid, token, channelid, widgetConfig, emailReceived, guest) {
  const guestEmail = guest.data.email === 'placeholder' ? null : guest.data.email
  return dispatch => {
    const botUserId = Math.random(Date.now())
    const firstBotMsg = {
      text: widgetConfig.content.autoAnswer,
      conversation_id: conversationid,
      user_id: botUserId,
      sender_name: widgetConfig.bot.name,
      id: Math.random(Date.now()),
      bot: true
    }
    const secondBotMsg = {
      text: widgetConfig.content.emailPrompt,
      conversation_id: conversationid,
      user_id: botUserId,
      sender_name: widgetConfig.bot.name,
      id: Math.random(Date.now()),
      bot: true
    }
    const thirdBotMsg = {
      text: widgetConfig.content.emailPlaceholder,
      conversation_id: conversationid,
      user_id: botUserId,
      sender_name: widgetConfig.bot.name,
      id: Math.random(Date.now()),
      bot: true,
      attachment: "inputBox"
    }
    setTimeout(() => {
      dispatch(createMessage(firstBotMsg, conversationid, token, channelid))
      if (!emailReceived && !guestEmail) {
        dispatch(createMessage(secondBotMsg, conversationid, token, channelid))
        dispatch(createMessage(thirdBotMsg, conversationid, token, channelid))
      }
    }, 1000)
    dispatch({type: "BOT_RESPONSE"})
  }
}
