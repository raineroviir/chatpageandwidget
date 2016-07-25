import urlConfig from '../../url-config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import * as loginActions from "../Login";
import * as createChannelActions from "../CreateChannel";
import { fetchUserInfo } from "../Navigation";
import { browserHistory } from 'react-router';
let channels = require("json!./../../mocks/v1/channels.list.json");
let conversations = require("json!./../../mocks/v1/conversations.list.json");

export function getChannels(channelid) {
  /* Mocks */
  /*return (dispatch, getState) => {
    return dispatch(processChannelsForDispatch(channels));
  }*/
  return dispatch => {
    if(typeof(Storage) === "undefined" || !localStorage.getItem("token")){
      dispatch(initGuestMessaging());
      return;
    }

    fetchChannels().then(response => {return response.json()})  
    .then(json => {
      /* If there is error in json stop proceeding */
      if(json.error) { return; }
      /* Invoke Channels Service when we recieve new channels */
      if(json.channels.length){
        dispatch(getConversations(channelid || Array.prototype.slice.call(json.channels).reverse().find(chl => chl.is_direct).id, json.channels))          
      }
      else{
        dispatch(processConversationsForDispatch({ conversations: []}, null)) 
      }
      dispatch(processChannelsForDispatch(json))
    })
  }
}
export function getConversations(channelid, channels, conversationname) {
  /* Mocks */
  /*return (dispatch, getState) => {
    return dispatch(processConversationsForDispatch(conversations));
  }*/

  return (dispatch, getState) => {
    /* Load memoized (cached) conversations from store if any */
    dispatch(processMemoizedConversationsForDispatch(channelid));
    /* Load memoized (cached) conversation history from store if any */
    let conv = getState().conversations.memoizedMessage[channelid];
    !!conv && dispatch(processMemoizedConversationsHistoryForDispatch(conv));

    /* Trigger API to get latest conversations */
    fetchConversations(channelid).then(response => {return response.json()})  
      .then(json => {
        /* Invoke Channels Service when we recieve new channels */
        if(json.conversations.length){
          let conversations = _.sortBy(json.conversations, a => parseInt(moment(a.updated_at).format("x"))).reverse();
          dispatch(getConversationHistory(conversationname || conversations[0].id));
        }
        else{
          /* Reset conversation history from API */
          dispatch(processConversationsHistoryForDispatch({ messages: []}, null)) 
        }
        dispatch(processConversationsForDispatch(json, channelid))
      })

      // Set isGroupChat flag if the chat is group chat
      channels && dispatch(processIsGroupForDispatch(channelid, channels));
  }
}
export function createMessage(message, conversationid) {
  return dispatch => {
    let access_token = null, fetchGuestInfo = fetch("");
    if(!localStorage.getItem('token')){
      if(typeof(Storage) !== undefined && !localStorage.getItem('guest')){
        // get guest user token if its not available
        fetchGuestInfo = loginActions.postLoginRequest({
          "username": "chat.center/guest",
          "password": "12345678",
          "grant_type": "password"
        }).then(response => response.json())
        .then(json => {
          access_token = json.token.access_token;
          !!typeof(Storage) && localStorage.setItem('guest', JSON.stringify(json.token));
        })
      }
      else{
        access_token = JSON.parse(localStorage.getItem('guest')).access_token
      }
      if(!conversationid){
        // get conversationid if its not available
        fetchGuestInfo = fetchGuestInfo.then(json => {
          var channel = window.location.hash.match(/\/([^\/]+)\/?$/);
          if(parseInt(channel[1])) channel = channel[0].match(/\/([^\/]+)\/?$/)[0];
          else channel = channel[1];
          return getChannel(channel, access_token);
        }).then(response => response.json())
        .then(json => {
          if(json.channel && json.channel.id){
            return createCoversation(json.channel.id, access_token);          
          }
          else{
            dispatch(genericError());
          }
        }).then(response => response.json())        
      }
      fetchGuestInfo.then(json => {
        if(conversationid || (json && json.conversation && json.conversation.id)){
          if(json && json.conversation && json.conversation.id) dispatch(setGuestConvid(json.conversation.id));
          // Post message using the conversationid
          postMessage(message, conversationid || json.conversation.id, access_token).then(response => response.json())
          .then(json => {
            dispatch(processCreateMessage(json));
            dispatch(processAddMessage(json));
          })
        }
        else{
          dispatch(genericError());
        }
      });
      
    }
    else{
      postMessage(message, conversationid).then(response => response.json())
        .then(json => {
          dispatch(processCreateMessage(json));
          dispatch(getConversationHistory(conversationid));
        })
    }
  }
}

export function getChannel(channel, access_token, team) {
  var url =  urlConfig.base + 'channels.find?channel=' + channel;
  if(team){
    url+= ("&team=" + team);
  }
  return fetch( url, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token,
    }
  })
}
export function getConversationHistory (conversationid) {
  return dispatch => {
    /* Trigger API service to retrieve latest conversation history */
    fetchConversationHistory(conversationid).then(response => {return response.json()})  
      .then(json => {
        dispatch(processConversationsHistoryForDispatch(json, conversationid))
        dispatch({
          type: 'SET_CONVERSATION_CHANNEL_MEMOIZED',
          posts: { conversationid},
          receivedAt: Date.now()
        });
      })
  }
}

export function setUserInfo(user, history) {
  if (typeof(Storage) !== "undefined") {
    var orgs = JSON.parse(localStorage.getItem("orgs")) || [],
      org;
    if(orgs.length > 1){
      org = orgs.find(item => {
        item.active = false;
        return item.name.indexOf(user) > 0;
      });
    }
    if(org){
      org.active = true;
      localStorage.setItem("token", JSON.stringify(org.token));      
    }
  }
  return {
    type: "DUMMY_DISPATCH",
    posts : null,
    receivedAt: Date.now()
  };
}

export function createChannelChatType(attr) {
  createChannelActions.chatType(attr);
}

export function createChannelDetailsReset() {
  createChannelActions.resetDetails();
}

export function fetchSocket () {
  return dispatch => {
    let getSocket = getSocketURL();
    if(getSocket){
      getSocket.then(response => response.json()).then(json => initializeSocket(json, dispatch));
    }
  }  
}

function getSocketURL (argument) {
  if (typeof(Storage) === "undefined" || !localStorage.getItem("token")) return null;
  var token = JSON.parse(localStorage.getItem("token"));
  return fetch( urlConfig.base + 'users.websocket.url', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  });
}

function initializeSocket(socket, dispatch) {
  const ws = new WebSocket(socket.url);
  ws.onopen = function(){
    ws.send(JSON.stringify(socket.subscription));
  }
  ws.onmessage = function(msg){
    if(msg && msg.data && JSON.parse(msg.data)){
      let data = JSON.parse(msg.data);
      if(!data.message || !data.message.type) return;
      switch (data.message.type){
        case "message": 
        dispatch(dispatchMessageStream(data.message));
      }
    }
  };
  
};

export function testSocket () {
  return dispatch => {
    dispatch(dispatchMessageStream({
      "payload": {
        "conversation_id": 97,
        "message_id": 63323,
        "text": "dummy hardcoded socket message",
        "user_id": 53
      },
      "timestamp": 1468657146,
      "type": "message"
    }))
  }
}

export function selectChannel (channelname, conversationname) {
  return (dispatch, getState) => {
    var service = Promise.resolve(), team = null;
    if(!getState().userinfo.userinfo.id){
      service = fetchUserInfo().then(response => {
          return response.json()
       })
        .then(json => { 
          team = json.user.team
        })
    }
    else{
      team = getState().userinfo.userinfo.team;
    }
    service.then(() => {
      fetchChannel(channelname, team).then(response => response.json())
      .then(json => {
        if(json.ok){
          dispatch(getConversations(json.channel.id, null, conversationname));
        }
      })   
    })
  }
}

function fetchChannel (channelname, team) {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch(urlConfig.base + "channels.find?channel=" + channelname + (team && team.domain ? "team=" + team.domain : "") , {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}
function dispatchMessageStream (message) {
  return {
    type: "MESSAGE_STREAM",
    posts: { message },
    receivedAt: Date.now()
  }
}

function fetchChannels() {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch( urlConfig.base + 'channels.list', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}
function createCoversation(channelid, access_token) {
  return fetch( urlConfig.base + 'conversations.create', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token,
    },
    body: JSON.stringify({ channel_id: channelid})
  })
}
function fetchConversations(channel_id) {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch( urlConfig.base + 'conversations.list?channel_id=' + channel_id, {
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
  return fetch( urlConfig.base + 'conversations.history?conversation_id=' + conversationid, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}
function postMessage(message, conversationid, access_token) {
  if (typeof(Storage) !== "undefined" && !access_token) {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch( urlConfig.base + 'messages.postMessage', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (access_token || token.access_token),
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
      all: channels.channels,
      publicChannels: source.filter(item => item.is_public && !item.is_direct) || [],
      privateChannels: source.filter(item => !item.is_public && !item.is_direct) || [],
      groupChannels: source.filter(item => item.is_group && !item.is_direct) || [],
      otherChannels: source.filter(item => !item.is_group && !item.is_direct) || [],
      directChannel: source.filter(item => item.is_direct)[0] || null,
      recentContacts: channels.recentContacts || []
    },
    meta = {
      count: source.length,
      isGroupChat: false
    };
  //console.log({ processed, meta });
  return {
    type: 'FETCH_CHANNELS',
    posts: { processed, meta },
    receivedAt: Date.now()
  }
}

function processIsGroupForDispatch(channelid, channels) {
  var channel = channels.filter(item => item.id == channelid),
    isGroupChat = !!(channel && channel.is_group);
  if(channelid == 63) isGroupChat = true;
  return {
    type: 'SET_IS_GROUP',
    posts: { isGroupChat},
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

function processMemoizedConversationsHistoryForDispatch(conversationid) {
  return {
    type: 'FETCH_MESSAGES_MEMOIZED',
    posts: { conversationid},
    receivedAt: Date.now()
  }
} 

function processMemoizedConversationsForDispatch(channelid) {
  return {
    type: 'FETCH_CONVERSATIONS_MEMOIZED',
    posts: { channelid},
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

function initGuestMessaging() {
  return {
    type: "SET_GUEST",
    posts: { guest: true },
    receivedAt: Date.now()
  }
}

function setGuestConvid (convid) {
  return {
    type: "SET_GUEST_CONV",
    posts: { convid },
    receivedAt: Date.now()
  }
}
function processAddMessage(response) {
  return {
    type: "ADD_MESSAGE",
    posts: response.message,
    receivedAt: Date.now()
  }
}
function genericError() {
  return {
    type: "GENERIC_ERROR",
    posts: "Error",
    receivedAt: Date.now()
  }
}