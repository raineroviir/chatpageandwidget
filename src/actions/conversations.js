import Config from '../../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';


function fetchConversations(channel_id, token) {
  return fetch( Config.api + '/conversations.list?channel_id=' + channel_id, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
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

export function setActiveConversation(conversationid) {
  return {
    type: "SET_ACTIVE_CONVERSATION",
    conversationid
  }
}

export function prepareToCreateConversation() {
  return {
    type: "PREPARE_TO_CREATE_NEW_CONVERSATION"
  }
}

export function backToConversationSummaryView() {
  return {
    type: 'BACK_TO_CONVERSATIONS_SUMMARY_VIEW'
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
          // dispatch(getConversationHistory(conversationname || conversations[0].id, token));
        }
        else {
          /* Reset conversation history from API */
          dispatch(processConversationsHistoryForDispatch({ messages: []}, null))
        }
        dispatch(processConversationsForDispatch(json, channelid))
      })

      // Set isGroupChat flag if the chat is group chat
      channels && dispatch(processIsGroupForDispatch(channelid, channels));
  }
}

export function getConversationHistory(conversationid, token) {
  console.log(conversationid, token)
  return dispatch => {
    /* Trigger API service to retrieve latest conversation history */
    return fetch( Config.api + '/conversations.history?conversation_id=' + conversationid, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(response => response.json())
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

/**
 * [createConversation description]
 * @param  {[Number]} channelid
 * @param  {[Object]} token
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
    }).then(response => response.json()).then(
      json => {
      let conversation = json.conversation
      dispatch({type:"CONVERSATION_CREATED", conversation})
      dispatch(setActiveConversation(conversation.id))
      return conversation
      },
      error => {
        dispatch({type: 'CONVERSATION_CREATION_FAILURE', error})
        throw error
      }
    )
  }
}
