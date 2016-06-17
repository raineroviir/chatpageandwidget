import fetch from 'isomorphic-fetch';
//import postLoginRequest from '../services/common/login';
import urlConfig from '../url-config';

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
    postLoginRequest().then(response => {return response.json()})	
      .then(json => dispatch(postActionConstruct(json)))
  }
}

function postLoginRequest(){
	  return fetch(urlConfig.base + '/users.signup',
    			{
    				method: 'POST',
    				headers:{
    					'Content-Type': 'application/json'
    				},
	     		 	body: JSON.stringify({
					  "username": "chat.center/sergey",
					  "password": "12345678",
					  "grant_type": "password"
					})
	  })
} 