import fetch from 'isomorphic-fetch';
import Config from '../config';

import {fetchUserInfo} from './user'

export function loginUser(Username,Password) {
  return (dispatch, getState) => {
    dispatch({
      type: 'LOGIN_USER',
      value:{"username":Username,"password":Password,"grant_type":"password"}
    })
    let payload = {username: Username, password: Password}
    dispatch({
      type: 'SET_LOGIN_DETAIL_STATE',
      state: {
        loginRequest: 'loading'
      }
    })
    postLoginRequest(payload)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        const token = json.token
        if (json.token) {
          if (typeof(Storage) !== "undefined") {
            var orgs = JSON.parse(localStorage.getItem("orgs")) || [],
              org = orgs.filter(item => item.name == payload.username);
            if(!org.length) {
              orgs.push({
                name: payload.username,
                token: json.token,
                user: null,
                active: false
              });
            }
            else{
              org[0].token = json.token;
            }
            localStorage.removeItem("orgs")
            localStorage.removeItem("token")
            localStorage.removeItem("guest")
            localStorage.setItem("orgs", JSON.stringify(orgs));
            localStorage.setItem("token", JSON.stringify(json.token));
          }
        }
        dispatch({
          type: "FINISHED_REGISTRATION_OR_LOGIN_PROCESS"
        })
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          token: token
        })
        dispatch(fetchUserInfo(token))
      },
      err => {throw err}).catch(e => console.log(e))
  }
}

export function addOrg (flag) {
  return dispatch => dispatch({ type: "SET_ADD_ORG", posts: { addOrg: flag, receivedAt: Date.now()}})
}

function postActionConstruct(json, payload, addOrg, goToInvitePage) {


}

export function postLoginRequest(payload){
  console.log(payload)
  if (payload.password && !payload.grant_type) {
    payload.grant_type = "password"
  }
	  return fetch(Config.authBase,
    			{
    				method: 'POST',
    				headers:{
    					'Content-Type': 'application/json'
    				},
	     		 	body: JSON.stringify(payload)
	  })
}
