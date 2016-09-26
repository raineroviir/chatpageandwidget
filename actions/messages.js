import Config from '../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import { createConversation } from './channels'
import { setOrGetGuestToken } from './user'
import { getConversationHistory, setGuestConvid } from './channels'
var _ = require("lodash");

export function createMessage(message, conversationid, token, channelid) {
  return dispatch => {
    // if (!token) {
    //   const token = JSON.parse(localStorage.getItem("guest"))
    // }
    // if (!channelid) {
    //   const channelid = JSON.parse(localStorage.getItem("channel")).id
    // }
    //
    console.log(conversationid)
  return postMessage(message, conversationid, token, channelid).then(response => response.json()).then(json => {
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
function postMessage(message, conversationid, token, channelid) {
  return fetch( Config.api + '/messages.postMessage', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  token,
    },
    body: JSON.stringify({
      text: message,
      conversation_id: conversationid,
      channel_id: channelid
    })
  })
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
    posts: response.message,
    receivedAt: Date.now()
  }
}

function botReplyForFirstMessage(conversationid) {
  let botMsg = "We normally answer within 60 minutes or less.  Please leave your question here and someone will be with you shortly.  Let us notify you via email"
  dispatch(createMessage(botMsg, conversationid))
}