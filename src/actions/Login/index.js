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
      return dispatch(postLogin(getState().loginDetails.User.payload))
  }
}

function postActionConstruct(json, payload) {
  if(json.token){
    window.location.hash = "#/channel/" + payload.username.split("/")[1];
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("token", JSON.stringify(json.token));
    }
  }
  return (dispatch, getState) => {
    console.log(JSON.stringify(json.token))
      dispatch({
      type: 'LOGIN_USER_RESPONSE',
      value:{"error":json.error,"token":json.token}
    })
  }
}

function postLogin(payload) {
  return dispatch => {
    postLoginRequest(payload).then(response => {return response.json()})	
      .then(json => dispatch(postActionConstruct(json, payload)))
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