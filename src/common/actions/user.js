import Config from '../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import { getConversationHistory, createConversation, createWidgetChannel, fetchChannels } from './channels'
import { createMessage } from './messages'
import apiService from '../api.service'

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
  console.log(token)
  return dispatch => {
    return fetch( Config.api + '/users.me', {
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
      console.log(json)
      json.guest ? dispatch(receiveGuestInfo(json)) :
      dispatch(receiveUserInfo(json))
    },
    error => {
      dispatch({type: 'FETCH_USER_INFO_ERROR', error})
      throw error
    }).catch(error => console.log(error))
  }
}

export function validateGuestTokenAndIfExpiredGiveNewGuestToken(token) {
  return fetch(`${Config.api}/auth.test`, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then(response => {
    if (response.status >= 400) {
      console.log("Bad response from server");
      return response.json()
    } else {
      return Promise.resolve(token)
    }
  }).then(json => {
    if (!json.ok) {
      fetchGuestToken(data).then(response => response.json()).then(json => {
        let token = json.token
        localStorage.setItem("guest", JSON.stringify(token))
      })
    }
  })
}

/**
 * [initUser description]
 * @param  {[Object]} data [This data object can include things like email, first name and last name]
 * @return {[Promise]}      [value is the token object.  Returning a promise allows us to chain .then() onto this function]
 */
export function initUser(data) {
  return (dispatch, getState) => {
    if (typeof(Storage) !== "undefined") {
      let token = JSON.parse(localStorage.getItem("guest")) || JSON.parse(localStorage.getItem("token"))
      if(!token) {
        // return fetchGuestToken(data).then(response => {
        //   if (response.status >= 400) {
        //     throw new Error("Bad response from server");
        //   }
        //   return response.json()
        // })
        return apiService(Config.app + '/guest.token', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(json => {
            if(json.ok) {
              let token = json.token.access_token;
              console.log(token)
              localStorage.setItem("guest", JSON.stringify(token))
              dispatch(fetchUserInfo(token))
              dispatch({type: 'TOKEN_SET', token})
              return token
            }
          },
            error => {
              dispatch({type: 'FETCH_TOKEN_ERROR', error})
              throw error
            }).catch(error => console.log(error))
      } else {
        console.log(token)
        dispatch(fetchUserInfo(token))
        dispatch({type: 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE', token})
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

export function receiveUserInfo(data) {
  return {
    type: "RECEIVED_USER_INFO", data
  }
}

export function forgetUser() {
  return {
    type: "FORGET_USER"
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
