import fetch from 'isomorphic-fetch';
let channels = require("json!./../../mocks/v1/channels.list.json");
let conversations = require("json!./../../mocks/v1/conversations.list.json");

export function getChannels() {
  /* Mocks */
  /*return (dispatch, getState) => {
    return dispatch(processChannelsForDispatch(channels));
  }*/
  return dispatch => {
    fetchUserInfo().then(response => {return response.json()})  
      .then(json => dispatch(processUserInfoForDispatch(json)));

    fetchChannels().then(response => {return response.json()})  
      .then(json => {
        /* Invoke Channels Service when we recieve new channels */
        if(json.channels.length){
          dispatch(getConversations(json.channels[0].id))          
        }
        else{
          dispatch(processConversationsForDispatch({ conversations: []}, null)) 
        }
        dispatch(processChannelsForDispatch(json))
      })
  }
}
export function getConversations(channelid) {
  /* Mocks */
  /*return (dispatch, getState) => {
    return dispatch(processConversationsForDispatch(conversations));
  }*/

  return dispatch => {
    fetchConversations(channelid).then(response => {return response.json()})  
      .then(json => {
        /* Invoke Channels Service when we recieve new channels */
        if(json.conversations.length){
          dispatch(getConversationHistory(json.conversations[0].id))          
          //dispatch(getConversationHistory(15))
        }
        else{
          dispatch(processConversationsHistoryForDispatch({ messages: []}, null)) 
        }
        dispatch(processConversationsForDispatch(json, channelid))
      })
  }
}
export function createMessage(message, conversationid) {
  return dispatch => {
    postMessage(message, conversationid).then(response => response.json())
      .then(json => {
        dispatch(processCreateMessage(json));
        dispatch(getConversationHistory(conversationid));
      })
  }
}
export function getConversationHistory (conversationid) {
  return dispatch => {
    fetchConversationHistory(conversationid).then(response => {return response.json()})  
      .then(json => dispatch(processConversationsHistoryForDispatch(json, conversationid)))
  }
}
function fetchChannels() {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch('https://api-beta.chat.center/v1/channels.list', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}
function fetchUserInfo() {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch('https://api-beta.chat.center/v1/users.me', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}
function fetchConversations(channel_id) {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch('https://api-beta.chat.center/v1/conversations.list?channel_id=' + channel_id, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}
function fetchConversationHistory(conversationid) {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch('https://api-beta.chat.center/v1/conversations.history?conversation_id=' + conversationid, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}
function postMessage(message, conversationid) {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch('https://api-beta.chat.center/v1/chats.postMessage', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    },
    body: JSON.stringify({
      text: message,
      conversation_id: conversationid
    })
  })
}

function processChannelsForDispatch(channels) {
  let source = channels.channels.reverse() || [], 
    processed = {
      publicChannels: source.filter(item => item.is_public) || [],
      privateChannels: source.filter(item => !item.is_public) || [],
      groupChannels: source.filter(item => item.is_group) || [],
      otherChannels: source.filter(item => !item.is_group) || [],
      recentContacts: channels.recentContacts || [],
      meta: {
        count: source.length
      }
    };
  //console.log(processed);
  return {
    type: 'FETCH_CHANNELS',
    posts: processed,
    receivedAt: Date.now()
  }
}

function processConversationsForDispatch(conversations, channelid) {
  return {
    type: 'FETCH_CONVERSATIONS',
    posts: { ...conversations, channelid},
    receivedAt: Date.now()
  }
}

function processConversationsHistoryForDispatch(messages, conversationid) {
  return {
    type: 'FETCH_MESSAGES',
    posts: { ...messages, conversationid},
    receivedAt: Date.now()
  }
}

function processUserInfoForDispatch(user) {
  return {
    type: 'USER_ME',
    posts: user.user,
    receivedAt: Date.now()
  }
}

function processCreateMessage(response) {
  return {
    type: "MESSAGE_CREATED",
    posts: {
      showSuccessMessage: true
    },
    receivedAt: Date.now()
  }
}