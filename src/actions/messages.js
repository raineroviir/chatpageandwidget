import Config from '../../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import { createConversation } from './channels'
import { setOrGetGuestToken } from './user'
import { getConversationHistory, setGuestConvid } from './channels'
var _ = require("lodash");

export function scrollComplete() {
  return {
    type: "SCROLL_COMPLETE_FOR_NEW_MESSAGE"
  }
}

export function createMessage(message, conversationid, token, channelid, attachment) {
  return dispatch => {
    // if (!token) {
    //   const token = JSON.parse(localStorage.getItem("guest"))
    // }
    // if (!channelid) {
    //   const channelid = JSON.parse(localStorage.getItem("channel")).id
    // }
    //
  return postMessage(message, conversationid, token, channelid, attachment).then(response => response.json()).then(json => {
    dispatch(processAddMessage(json, conversationid || json.message.conversation_id))
    // dispatch(getConversationHistory(conversationid, token))
    // dispatch(setGuestConvid(conversationid));
  })
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

export function botReplyForFirstMessage(conversationid, token, channelid) {
  return dispatch => {
    const firstBotMsg = "We normally answer within 60 minutes or less.  Please leave your question here and someone will be with you shortly."
    const secondBotMsg = "Let us notify you via email"
    const thirdBotMsg = "Enter your email"
    const attachment = "inputBox"
    dispatch(createMessage(firstBotMsg, conversationid, token, channelid))
    dispatch(createMessage(secondBotMsg, conversationid, token, channelid))
    dispatch(createMessage(thirdBotMsg, conversationid, token, channelid, attachment))
    dispatch({type: "BOT_RESPONSE"})
  }
}
