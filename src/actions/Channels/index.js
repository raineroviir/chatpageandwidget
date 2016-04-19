import fetch from 'isomorphic-fetch';
let channels = require("json!./../../mocks/v1/channels.list.json");
let conversations = require("json!./../../mocks/v1/conversations.list.json");

export function getChannels() {
  return (dispatch, getState) => {
    return dispatch(processChannelsForDispatch(channels));
  }
}
export function getConversations() {
  return (dispatch, getState) => {
    return dispatch(processConversationsForDispatch(conversations));
  }
}

function processChannelsForDispatch(channels) {
  let source = channels.channels || [], 
    processed = {
      publicChannels: source.filter(item => item.is_public) || [],
      groupChannels: source.filter(item => item.is_group) || [],
      recentContacts: channels.recentContacts
    };
  console.log(processed);
  return {
    type: 'FETCH_CHANNELS',
    posts: processed,
    receivedAt: Date.now()
  }
}

function processConversationsForDispatch(conversations) {
  return {
    type: 'FETCH_CONVERSATIONS',
    posts: conversations.conversations,
    receivedAt: Date.now()
  }
}
/*//https://id.chat.center/oauth/token
function postLoginRequest(payload){
  return fetch('https://api-beta.chat.center/v1/users.signup', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
} */