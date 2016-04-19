import fetch from 'isomorphic-fetch';
//import postLoginRequest from '../services/common/login';

export function loginUser(Username,Password) {
  return (dispatch, getState) => {
      dispatch({
      type: 'LOGIN_USER',
      value:{"username":Username,"password":Password,"grant_type":"password"}
    })
  }
}

export function submitLogin(index) {
  //alert('submitRegistration');
  return (dispatch, getState) => {
      return dispatch(postLogin(getState().loginDetails.User))
  }
}

function postActionConstruct(json) {
  if(json.token){
    window.location.hash = "#/home";
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("token", json.token);
    }
  }
  return (dispatch, getState) => {
      dispatch({
      type: 'LOGIN_USER',
      value:{"error":json.error,"token":json.token}
    })
  }
}

function postLogin(payload) {
  return dispatch => {
    postLoginRequest(payload).then(response => {return response.json()})	
      .then(json => dispatch(postActionConstruct(json)))
  }
}

//https://id.chat.center/oauth/token
function postLoginRequest(payload){
	  return fetch('https://id.chat.center/oauth/token',
    			{
    				method: 'POST',
    				headers:{
    					'Content-Type': 'application/json'
    				},
	     		 	body: JSON.stringify(payload)
	  })
}