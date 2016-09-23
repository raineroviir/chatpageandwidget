import Config from '../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
// import * as loginActions from "../Login";
// import * as createChannelActions from "../CreateChannel";
import { fetchUserInfo, setOrGetGuestToken} from "./user";

let channels = require("./../mocks/v1/channels.list.json");
let conversations = require("./../mocks/v1/conversations.list.json");
var _ = require("lodash");

// export function initializeConversation() {
//   let access_token = dispatch(setOrGetGuestToken())
//   return dispatch => {
//     dispatch(createConversation(channelid, access_token))
//   }
// }

export function getChannels(channelid) {
  /* Mocks */
  /*return (dispatch, getState) => {
    return dispatch(processChannelsForDispatch(channels));
  }*/
  return dispatch => {
    if(typeof(Storage) === "undefined" || !localStorage.getItem("token")){
      dispatch(initGuestMessaging());
      let url = window.location.href,
        channel = url.match(/\/([^\/]+)\/?$/),
        token = false;
      channel = (typeof channel[1] === "number") ? url.substr(0, url.length - channel[0].length).match(/\/([^\/]+)\/?$/)[1] : channel[1];

      if(localStorage.getItem("guest")){
        token = JSON.parse(localStorage.getItem("guest"));
        dispatch(setGuestUserId(token.user_id));
      }
      getChannel(channel, window.location.hostname).then(response => response.json())
        .then(json => {
          if(!json.ok) {
            dispatch(messageError(true));
          }
          else {
            dispatch(messageError(false))
            if(json.channel && json.channel.is_group){
              dispatch({
                type: "SET_GUEST_GROUP_CONV_ID",
                posts: { conversationid: json.channel.conversation.id },
                receivedAt: Date.now()
              })
            }
          }
        })

      if(localStorage.getItem("guestMessages")){
        let guestMessages = JSON.parse(localStorage.getItem("guestMessages")),
          channelInfo = guestMessages.find(a => a.channel === channel);
        !!channelInfo.conversationid && dispatch(getConversationHistory(channelInfo.conversationid, token))
      }
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

/**
 * [getConversations description]
 * @param  {[String or Num]} channelid
 * @param  {[String]} token

 */
export function getConversations(channelid, token, channels, conversationname) {
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
    fetchConversations(channelid, token).then(response => {return response.json()})
      .then(json => {
        /* Invoke Channels Service when we recieve new channels */
        if(json && json.conversations && json.conversations.length){
          let conversations = _.sortBy(json.conversations, a => parseInt(moment(a.updated_at).format("x"))).reverse();
          dispatch(getConversationHistory(conversationname || conversations[0].id, token));
        }
        else{
          /* Reset conversation history from API */
          // If we get to this point, that means that there were no conversations in our channel, and if we're a guest, we create one here
          dispatch(createConversation(channelid, token))
          dispatch(processConversationsHistoryForDispatch({ messages: []}, null))
        }
        dispatch(processConversationsForDispatch(json, channelid))
      })

      // Set isGroupChat flag if the chat is group chat
      channels && dispatch(processIsGroupForDispatch(channelid, channels));
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

export function getChannel(channel, team) {
  var url =  Config.api + '/channels.find?channel=' + channel;
  if(team && team !== "localhost"){
    url+= ("&team=" + team);
  }
  return fetch( url, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json'
    }
  })
}

/**
 * [getConversationHistory description]
 * @param  {[String or Number]} conversationid
 * @param  {[String]} token
 */
export function getConversationHistory (conversationid, token) {
  return dispatch => {
    /* Trigger API service to retrieve latest conversation history */
    fetchConversationHistory(conversationid, token).then(response => {return response.json()})
      .then(json => {
        console.log('conversationhistory', json)
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

export function fetchSocket (token) {
  return dispatch => {
    let getSocket = getSocketURL(token);
    if(getSocket){
      getSocket.then(response => response.json()).then(json => initializeSocket(json, dispatch));
    }
  }
}




function getSocketURL (token) {
  if ((typeof(Storage) === "undefined" || (!localStorage.getItem("token") && !localStorage.getItem("guest"))) && !token ) return null;
  if(!token) { token = JSON.parse(localStorage.getItem("token") || localStorage.getItem("guest")) }
  return fetch( Config.api + '/users.websocket.url', {
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
      if(!data.message || !data.message.type) {
        return
      }
      switch (data.message.type){
        case "message":
        dispatch(dispatchMessageStream(data.message));
      }
    }
  };
  return dispatch(socketInitialized(socket))
};

function socketInitialized(socket) {
  return {
    type: 'INITALIZED_SOCKET',
    socket: socket
  }
}

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
    var service = Promise.resolve(), team = null, failure = false;
    if(!getState().userinfo.userinfo.id){
      service = fetchUserInfo().then(response => {
          return response.json()
       })
        .then(json => {
          if(!json.ok) { failure = true; }
          else { team = json.user.team }
        })
    }
    else{
      team = getState().userinfo.userinfo.team;
    }
    service.then(() => {
      if(!failure){
        fetchChannel(channelname, team).then(response => response.json())
        .then(json => {
          if(json.ok){
            dispatch(getConversations(json.channel.id, null, conversationname));
          }
        })
      }
    })
  }
}

function fetchChannel (channelname, team) {
  if (typeof(Storage) !== "undefined") {
    var token = JSON.parse(localStorage.getItem("token"));
  }
  return fetch(Config.api + "/channels.find?channel=" + channelname + (team && team.name ? "&team=" + team.name : "") , {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    }
  })
}
function dispatchMessageStream (message) {
  console.log('disptchmessage stream')
  return {
    type: "MESSAGE_STREAM",
    posts: { message },
    receivedAt: Date.now()
  }
}

export function fetchChannels(token) {
  return dispatch => {
    return fetch( Config.api + '/channels.list', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token,
      }
    }).then(response => response.json()).then(json => {
      dispatch(receiveChannels(json.channels))
    })
  }
}

function receiveChannels(channels) {
  return {
    type: 'RECEIVED_CHANNELS_FROM_SERVER',
    channels
  }
}

export function createWidgetChannel(token) {
  return dispatch => {
    if (!token) {
      token = JSON.parse(localStorage.getItem("guest"))
    }
    let data = new FormData()
    data.append('channel', token.access_token)
    // const data = {channel: "ExampleChannel101"}
    return fetch(Config.api + '/channels.create',
      {
        method: 'POST',
        headers:{
          'enctype':"multipart/form-data",
          'Authorization': 'Bearer ' + token.access_token
        },
        body: data
    }).then(response => response.json()).then(json => {
      if (json.error) {
        return console.log(json.error)
      }
      const channelid = {id: json.channel.id}
      localStorage.setItem("channel", JSON.stringify(channelid))
      return dispatch(widgetChannelCreated(json.channel))
    })
  }
}

function widgetChannelCreated(channel) {
  return {
    type: 'WIDGET_CHANNEL_CREATED',
    channel
  }
}

/**
 * [createConversation description]
 * @param  {[Number]} channelid [description]
 * @param  {[Object]} token     [description]
 * @return {[type]}           [description]
 */
export function createConversation(channelid, token) {
  return dispatch => {
  if (!token) {
    let token = JSON.parse(localStorage.getItem("guest"))
  }
  let body = JSON.stringify({channel_id: channelid})
    return fetch( Config.api + '/conversations.create', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: body
    }).then(response => response.json()).then(json => {
      let conversation = json
      localStorage.setItem("guestconversation", JSON.stringify(json.conversation))
      return dispatch({type:"CONVERSATION_CREATED", conversation})
    })
  }
}

function fetchConversations(channel_id, token) {
  return fetch( Config.api + '/conversations.list?channel_id=' + channel_id, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
}

function fetchConversationHistory(conversationid, token) {
  return fetch( Config.api + '/conversations.history?conversation_id=' + conversationid, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
}

function processChannelsForDispatch(channels) {
  let source = channels.channels.reverse() || [],
    processed = {
      all: channels.channels,
      publicChannels: source.filter(item => item.is_public && !item.is_direct) || [],
      privateChannels: source.filter(item => !item.is_public && !item.is_direct) || [],
      groupChannels: source.filter(item => item.is_group && !item.is_direct && !item.is_public) || [],
      otherChannels: source.filter(item => item.is_public && !item.is_direct) || [],
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
  var channel = channels.find(item => item.id == channelid),
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

function initGuestMessaging() {
  return {
    type: "SET_GUEST",
    posts: { guest: true },
    receivedAt: Date.now()
  }
}

export function setGuestConvid (convid) {
  return {
    type: "SET_GUEST_CONV",
    posts: { convid },
    receivedAt: Date.now()
  }
}


function messageError(flag) {
  return {
    type: "MESSAGE_ERROR",
    posts: {flag},
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
