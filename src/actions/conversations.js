import Config from '../../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';


function fetchConversations(channel_id, token) {
  return fetch( Config.api + '/conversations.list?channel_id=' + channel_id, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token.access_token || token,
    }
  })
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

export function getConversations(channel_id, token) {
  console.log(channel_id)
  return dispatch => {
    return fetch( Config.api + '/conversations.list?channel_id=' + channel_id, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token || token,
      }
    }).then(response => {
      return response.json()
    }).then(json => {
      console.log(json)
      const conversations = json
      dispatch({
      type: 'FETCH_CONVERSATIONS',
      data: { ...conversations, channel_id},
      receivedAt: Date.now()
      })
      return json
    }).catch(e => {
      throw e
    })
  }
}

export function getConversationHistory(conversationid, token) {
  console.log(conversationid, token)
  return dispatch => {
    /* Trigger API service to retrieve latest conversation history */
    return fetch( Config.api + `/conversations.history?conversation_id=${conversationid}`, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(json => {
        console.log('conversationhistory', json)
        dispatch(processConversationsHistoryForDispatch(json, conversationid))
        dispatch({
          type: 'SET_CONVERSATION_CHANNEL_MEMOIZED',
          posts: { conversationid},
          receivedAt: Date.now()
        })
        return json
      }, error => {
        dispatch({type: 'FETCH_CONVERSATION_HISTORY_ERROR', error})
        throw error
      })
  }
}

/**
 * [createConversation description]
 * @param  {[Number]} channelid
 * @param  {[Object]} token
 */
export function createConversation(channel_id, token) {
  return dispatch => {
    return fetch( Config.api + '/conversations.create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({channel_id: channel_id})
    }).then(response => response.json()).then(json => {
      const conversation = json.conversation
      localStorage.setItem("guestConversation", JSON.stringify({conversation_id: conversation.id, channel_id: channel_id}))
      dispatch({type:"CONVERSATION_CREATED", conversation})
      return conversation
    })
  }
}

export function checkForConversation(channel_id, token) {
  const conversation = JSON.parse(localStorage.getItem("guestConversation"))
  return dispatch => {
    console.log(conversation)
    if (!conversation) {
      dispatch(createConversation(channel_id, token))
    } else {
      const { conversation_id } = conversation
      dispatch(setActiveConversation(conversation_id))
    }
  }
}
