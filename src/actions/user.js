import Config from '../../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { getConversationHistory, fetchSocket, createConversation, createWidgetChannel, fetchChannels } from './channels'
import { createMessage } from './messages'

/**
 * [fetchGuestToken description]
 * @param  {[Object]} data [user entered/placeholder data that we pass into our guest user creation]
 * @return {[Promise]}      [returns the fetch Promise]
 */
function fetchGuestToken(data) {
  return fetch( Config.app + '/guest.token', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * [fetchUserInfo description]
 * @param  {[Object]} token [token object]
 * @return {[Promise]}
 */
export function fetchUserInfo(token) {
  return dispatch => {
    return fetch( Config.api + '/users.me', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token
      }
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json()
    }).then(json => {
      json.guest ? dispatch(receiveGuestInfo(json)) :
      dispatch(receiveUserInfo(json))
    },
    error => {
      dispatch({type: 'FETCH_TOKEN_ERROR', error})
      throw error
    }).catch(error => console.log(error))
  }
}

/**
 * [initUser description]
 * @param  {[Object]} data [This data object can include things like email, first name and last name]
 * @return {[Promise]}      [value is the token object.  Returning a promise allows us to chain .then() onto this function]
 */
export function initUser(data) {
  return dispatch => {
    if (typeof(Storage) !== "undefined") {
      let token = JSON.parse(localStorage.getItem("guest")) || JSON.parse(localStorage.getItem("token"))
      if(!token) {
        return fetchGuestToken(data).then(response => {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json()
        })
          .then(json => {
            if(json.ok) {
              let token = json.token;
              localStorage.setItem("guest", JSON.stringify(token))
              dispatch(fetchUserInfo(token))
              dispatch({type: 'TOKEN_SET', token})
              return dispatch(fetchSocket(token)).then(() => token)
            }
          },
            error => {
              dispatch({type: 'FETCH_TOKEN_ERROR', error})
              throw error
            }).catch(error => console.log(error))
      } else {
        dispatch(fetchUserInfo(token))
        dispatch({type: 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE', token})
        dispatch(fetchSocket(token))
        return Promise.resolve(token)
      }
    } else {
      dispatch({type: "HTML5_LOCAL_STORAGE_NOT_SUPPORTED"})
      throw error
    }
  }
}

/**
 * [updateUser description]
 * @param  {[Object]} updates
 * @param  {[String]} token
 */
export function updateUser(updates, token) {
  return dispatch => {
    return fetch(Config.api + '/users.update', {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(updates)
    }).then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json()
    }).then(user => {
      console.log(user)
      if (user.guest) {
        const guest = user.guest
        dispatch({type: "GUEST_UPDATED", guest})
      } else {
        dispatch({type: "USER_UPDATED", user})
      }
    },
    error => {
      dispatch({type: 'UPDATE_USER_ERROR', error})
      throw error
    }).catch(error => console.log(error))
  }
}

function receiveUserInfo(data) {
  return {
    type: "RECEIVED_USER_INFO", data
  }
}

export function submittedEmailToBot(email) {
  return {
    type: "SUBMITTED_EMAIL_TO_BOT", email
  }
}
function receiveGuestInfo (data) {
  return {
    type: "RECEIVED_GUEST_INFO", data
  }
}
