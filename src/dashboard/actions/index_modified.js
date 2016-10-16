import fetch from 'isomorphic-fetch';
import Config from '../../config';

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

export function registerOrganisationName(RegisterOrganisationName) {
  return {
    type: 'REGISTER_ORGANISATION_NAME',
    RegisterOrganisationName,
  };

}


export function submitRegistration(index) {
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
	  return fetch(Config.authBase,
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