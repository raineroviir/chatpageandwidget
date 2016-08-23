import fetch from 'isomorphic-fetch';
//import postLoginRequest from '../services/common/login';
import Config from '../config';

export function addItem(fields) {
  return {
    type: 'ADD_ITEM',
    fields,
  };
}

export function delItem(index) {
  return {
    type: 'DELETE_ITEM',
    index,
  };
}

export function submitRegistration() {
  alert('submitRegistration');
  return (dispatch, getState) => {
      return dispatch(postRegistration())
  }
}

function postActionConstruct(json) {
  console.log(JSON.stringify(json));
  return {
    type: 'SUBMIT_REGISTRATION',
    posts: 'json.data',
    receivedAt: Date.now()
  }
}

function postRegistration() {
  return dispatch => {
    dispatch({
      type: 'SET_SIGNUP_REQ_STATUS',
      value: 'loading'
    });
    postLoginRequest().then(response => {return response.json()})	
      .then(json => {
        
        dispatch(postActionConstruct(json));
        dispatch({
          type: 'SET_SIGNUP_REQ_STATUS',
          value: 'loaded'
        });
      })
  }
}

function postLoginRequest(){
	  return fetch(Config.api + '/users.signup',
    			{
    				method: 'POST',
    				headers:{
    					'Content-Type': 'application/json'
    				},
	     		 	body: JSON.stringify({
					  "username": window.config.cc + "/sergey",
					  "password": "12345678",
					  "grant_type": "password"
					})
	  })
} 