import Config from '../../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

import { fetchUserInfo, setOrGetGuestToken} from "./user";
import { getConversations, processConversationsForDispatch } from './conversations'
import { scrollToBottom } from './environment'
import {dispatchMessageStream} from './messages'

export function fetchSocket(token, userid) {
  return dispatch => {
    let getSocket = getSocketURL(token);
    if(getSocket) {
      getSocket.then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json()
      }).then(json => {
        return initializeSocket(json, dispatch)
      }, error => {
        dispatch({type: 'FETCH_SOCKET_ERROR', error})
        throw error
      }).catch(error => console.log(error))
    }
  }
}

export function fetchChannelInfo(token, channel_id) {
  return dispatch => {
    return fetch( Config.api + `/channels.info?channel_id=${channel_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json()
    })
    .then(channelInfo => dispatch({type: "RECEIVE_CHANNEL_INFO", channelInfo})).catch(error => console.log(error))
  }
}

function getSocketURL (token) {
  if ((typeof(Storage) === "undefined" || (!localStorage.getItem("token") && !localStorage.getItem("guest"))) && !token ) return null;
  if(!token) { token = JSON.parse(localStorage.getItem("token") || localStorage.getItem("guest")) }
  return fetch( Config.api + '/users.websocket.url', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token || token,
    }
  });
}

function initializeSocket(socket, dispatch) {
  const ws = new WebSocket(socket.url)
  ws.onopen = function() {
    ws.send(JSON.stringify(socket.subscription))
  }
  ws.onmessage = function(msg) {
    if(msg && msg.data && JSON.parse(msg.data)) {
      let data = JSON.parse(msg.data)
      if(!data.message || !data.message.type) {
        return
      }
      switch (data.message.type) {
        case "message": {
          dispatch(dispatchMessageStream(data.message.payload))
        }
      }
    }
  }
  return dispatch(socketInitialized(socket))
}

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
    else {
      team = getState().userinfo.userinfo.team;
    }
    service.then(() => {
      if(!failure){
        fetchChannel(channelname, team).then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json()
})
        .then(json => {
          if(json.ok){
            dispatch(getConversations(json.channel.id, null, conversationname));
          }
        })
      }
    })
  }
}

export function fetchChannel(channelname, team, token) {
  return dispatch => {
  return fetch(`${Config.api}/channels.find?channel=${channelname}&team=${team}`, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json()
}).then(json => {
    dispatch({type: "FETCHED_CHANNEL", json})
    console.log(json)
    return json.channel.id
  }, error => {
    dispatch({type: 'FETCH_CHANNEL_ERROR', error})
    throw error
  }).catch(error => console.log(error))
  }
}




export function fetchChannels(token) {
  return dispatch => {
    return fetch( Config.api + '/channels.list', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token || token,
      }
    }).then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json()
}).then(json => {
      dispatch(receiveChannels(json.channels))
    }).catch(error => console.log(error))
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
    let data = new FormData()
    data.append('channel', token.access_token)
    // const data = {channel: "ExampleChannel101"}
    return fetch(Config.api + '/channels.create',
      {
        method: 'POST',
        headers:{
          'enctype':"multipart/form-data",
          'Authorization': 'Bearer ' + token
        },
        body: data
    }).then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json()
}).then(json => {
      const channelid = {id: json.channel.id}
      dispatch(widgetChannelCreated(json.channel))
    }).catch(error => console.log(error))
  }
}

function widgetChannelCreated(channel) {
  return {
    type: 'WIDGET_CHANNEL_CREATED',
    channel
  }
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
