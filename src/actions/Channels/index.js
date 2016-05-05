import fetch from 'isomorphic-fetch';
let channels = require("json!./../../mocks/v1/channels.list.json");
let conversations = require("json!./../../mocks/v1/conversations.list.json");

export function getChannels(channelid) {
  /* Mocks */
  /*return (dispatch, getState) => {
    return dispatch(processChannelsForDispatch(channels));
  }*/
  return dispatch => {
    fetchUserInfo().then(response => {return response.json()})  
      .then(json => {
        dispatch(processUserInfoForDispatch(json))
        dispatch(processOrgsForDispatch(json));
      });

    fetchChannels().then(response => {return response.json()})  
      .then(json => {
        /* Invoke Channels Service when we recieve new channels */
        if(json.channels.length){
          dispatch(getConversations(channelid || json.channels[0].id, json.channels))          
        }
        else{
          dispatch(processConversationsForDispatch({ conversations: []}, null)) 
        }
        dispatch(processChannelsForDispatch(json))
      })
  }
}
export function getConversations(channelid, channels) {
  /* Mocks */
  /*return (dispatch, getState) => {
    return dispatch(processConversationsForDispatch(conversations));
  }*/

  return dispatch => {
    fetchConversations(channelid).then(response => {return response.json()})  
      .then(json => {
        /* Invoke Channels Service when we recieve new channels */
        if(json.conversations.length){
          dispatch(getConversationHistory(json.conversations[0].id));
        }
        else{
          dispatch(processConversationsHistoryForDispatch({ messages: []}, null)) 
        }
        dispatch(processConversationsForDispatch(json, channelid))
      })

      // Set isGroupChat flag if the chat is group chat
      dispatch(processIsGroupForDispatch(channelid, channels));
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

export function switchOrganization(org, orgs, history) {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("token", JSON.stringify(org.token));     
  }
  window.location = "#/dashboard/" + org.name.split("/")[1];
  //history.push("/dashboard/" + org.name.split("/")[1]);
  //dispatch(processOrgForDispatch(org, orgs));
  org.active = true;
  return dispatch => {
    dispatch(getChannels())
    return dispatch(processOrgForDispatch(org, orgs))
  }
  /*return {
    type: "DUMMY_DISPATCH",
    posts : null,
    receivedAt: Date.now()
  }*/
}

export function addOrganization(org) {
  var orgs = JSON.parse(localStorage.getItem("orgs")) || [],
    orgn = orgs.filter(item => item.token.access_token == org.token.access_token);
  if(!orgn.length) {
    org.active = false;
    orgs.push(org);
    localStorage.setItem("orgs", JSON.stringify(orgs));
  }
  return {
    type: "DUMMY_DISPATCH",
    posts : null,
    receivedAt: Date.now()
  };
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
      all: channels.channels,
      publicChannels: source.filter(item => item.is_public) || [],
      privateChannels: source.filter(item => !item.is_public) || [],
      groupChannels: source.filter(item => item.is_group) || [],
      otherChannels: source.filter(item => !item.is_group) || [],
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

function processOrgsForDispatch(userinfo) {
  if (typeof(Storage) !== "undefined") {
    var orgs = JSON.parse(localStorage.getItem("orgs")) || [],
      token = JSON.parse(localStorage.getItem("token")),
      org = orgs.find(item => {
        return item.token.access_token == token.access_token
      });
    orgs = orgs.filter(item => {item.active = false; return true; });
    if(!org){
      let chname = window.location.hash.split("dashboard/")[1];
      orgs.push({
        name: (userinfo.user.team) ? userinfo.user.team.name + "/" + chname : "chat.center/" + chname,
        token: token,
        user: userinfo.user,
        active: true
      })
    }
    else{
      org.active = true;
    }
    if(org && !org.user){
      org.user = userinfo.user;
      localStorage.setItem("orgs", JSON.stringify(orgs)); 
      //console.log(localStorage.getItem("orgs"));
    }
  }
  return {
    type: "SET_ORGANIZATIONS",
    posts: orgs,
    receivedAt: Date.now()
  }
}

function processOrgForDispatch(org) {
  if (typeof(Storage) !== "undefined") {
    var orgs = JSON.parse(localStorage.getItem("orgs")) || [];
    orgs.filter(item => {
      item.active = false;
      if(item.name == org.name){
        item.active = true;
      }
    });
  }
  return {
    type: "SET_ORGANIZATION",
    posts: orgs,
    receivedAt: Date.now()
  }
}