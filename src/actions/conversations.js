import Config from '../../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';

function processConversationsHistoryForDispatch(messages, conversationid) {
  return {
    type: 'FETCH_MESSAGES',
    posts: { ...messages, conversationid},
    receivedAt: Date.now()
  }
}

export function setactiveConversationId(conversationid) {
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

export function markConversationAsRead(conversationid, token, timestamp) {
  return dispatch => {
    return fetch(Config.app + '/conversations.read', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({conversation_id: conversationid, timestamp: timestamp})
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json()
    }).then(json => {
      console.log(json)
      dispatch({type: "MARK_ALL_MESSAGES_AS_READ"})
      return json
    }).catch(error => console.log(error))
  }
}
export function getConversations(channel_id, token) {
  return dispatch => {
    return fetch( Config.api + '/conversations.list?channel_id=' + channel_id, {
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
      const conversations = json
      dispatch({
      type: 'FETCH_CONVERSATIONS',
      data: { ...conversations, channel_id},
      receivedAt: Date.now()
      })
      return json
    }).catch(error => console.log(error))
  }
}
export function getConversationHistory(conversationid, token, oldestVisibleMessageUnixTimestamp, page, perpage) {
  console.log(oldestVisibleMessageUnixTimestamp)
  const created_before = oldestVisibleMessageUnixTimestamp ? `&created_before=${oldestVisibleMessageUnixTimestamp}` : ""
  console.log(created_before)
  return dispatch => {
    /* Trigger API service to retrieve latest conversation history */
    return fetch( Config.api + `/conversations.history?conversation_id=${conversationid}${created_before}&page=${page || 1}&per_page=${perpage || 50}`, {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json()
})
      .then(json => {
        if (json.messages.length > 0) {
          dispatch({type: "INCREASE_NEXT_FETCH_PAGE"})
        }
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
      }).catch(error => console.log(error))
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
    }).then(response => {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json()
}).then(json => {
      const conversation = json.conversation
      localStorage.setItem([channel_id], JSON.stringify(conversation.id))
      dispatch({type:"CONVERSATION_CREATED", conversation})
      return conversation
    }).catch(error => console.log(error))
  }
}

export function checkForConversation(channel_id, token) {
  const localStorageConversationId = JSON.parse(localStorage.getItem(channel_id))
  return dispatch => {
    if (!localStorageConversationId) {
      dispatch(createConversation(channel_id, token))
    } else {
      dispatch(setactiveConversationId(localStorageConversationId))
    }
  }
}
