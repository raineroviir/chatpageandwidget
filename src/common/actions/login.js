import fetch from 'isomorphic-fetch';
import Config from '../config';
//import postLoginRequest from '../services/common/login';
// import { browserHistory } from 'react-router';
import {fetchUserInfo} from './user'
export function loginUser(Username,Password) {
  return (dispatch, getState) => {
      dispatch({
      type: 'LOGIN_USER',
      value:{"username":Username,"password":Password,"grant_type":"password"}
    })
    let payload = {username: Username, password: Password}
    dispatch(postLogin(payload))
  }
}

export function submitLogin(addOrg,goToInvitePage) {
  //alert('submitRegistration');
  return (dispatch, getState) => {
      return dispatch(postLogin(getState().login.user.payload, addOrg, goToInvitePage))
  }
}

export function addOrg (flag) {
  return dispatch => dispatch({ type: "SET_ADD_ORG", posts: { addOrg: flag, receivedAt: Date.now()}})
}

function postActionConstruct(json, payload, addOrg, goToInvitePage) {

  if(json.token){
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
      localStorage.setItem("orgs", JSON.stringify(orgs));
      localStorage.setItem("token", JSON.stringify(json.token));
      localStorage.setItem("guest", null);
    }
    if(goToInvitePage){
      //window.location.hash = "#/organization/invite";
      // browserHistory.push("/organization/invite");

    }
    else{
      //window.location.hash = "#/dashboard/" + payload.username.split("/")[1];
      // browserHistory.push('/dashboard/' + payload.username.split("/")[1]);
    }
  }
  console.log(json)
  console.log(payload)
  return (dispatch, getState) => {
    dispatch({
      type: "FINISHED_REGISTRATION_PROCESS"
    })
  }
}

export function postLogin(payload, addOrg, goToInvitePage) {
  return dispatch => {
    dispatch({
      type: 'SET_LOGIN_DETAIL_STATE',
      state: {
        loginRequest: 'loading'
      }
    })
    postLoginRequest(payload)
      .then(response => {return response.json()})
      .then(json => {
        console.log(json.token.access_token)
        dispatch(postActionConstruct(json, payload, addOrg, goToInvitePage))
        dispatch({
          type: "SET_GUEST",
          posts: { guest: false },
          receivedAt: Date.now()
        });
        dispatch({
          type: 'SET_LOGIN_DETAIL_STATE',
          state: {
            loginRequest: 'loaded'
          }
        })
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          token: json.token.access_token
        })
        console.log(json.token.access_token)
        dispatch(fetchUserInfo(json.token.access_token))
      }, err => {
        dispatch({
          type: 'SET_LOGIN_DETAIL_STATE',
          state: {
            loginRequest: 'error'
          }
        })
      })
  }
}

export function postLoginRequest(payload){
  console.log(payload)
	  return fetch(Config.authBase,
    			{
    				method: 'POST',
    				headers:{
    					'Content-Type': 'application/json'
    				},
	     		 	body: JSON.stringify(payload)
	  })
}
