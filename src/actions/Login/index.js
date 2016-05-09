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

export function submitLogin(addOrg) {
  //alert('submitRegistration');
  return (dispatch, getState) => {
      return dispatch(postLogin(getState().loginDetails.User.payload, addOrg))
  }
}

function postActionConstruct(json, payload, addOrg) {
  if(json.token){
    window.location.hash = "#/dashboard/" + payload.username.split("/")[1];
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
      if(addOrg) localStorage.setItem("orgs", JSON.stringify(orgs));
      localStorage.setItem("token", JSON.stringify(json.token));
      localStorage.setItem("guest", null);
    }
  }
  return (dispatch, getState) => {
    dispatch({
      type: 'RESET_CHANNELS',
      value:"Login Success",
      receivedAt: Date.now()
    });    
    dispatch({
      type: 'RESET_USER',
      value:"Login Success",
      receivedAt: Date.now()
    });
    dispatch({
      type: 'RESET_CONVERSATIONS',
      value:"Login Success",
      receivedAt: Date.now()
    });    
    dispatch({
      type: 'RESET_MESSAGES',
      value:"Login Success",
      receivedAt: Date.now()
    });
    dispatch({
      type: 'LOGIN_USER_RESPONSE',
      value:{"error":json.error,"token":json.token}
    })
  }
}

function postLogin(payload, addOrg) {
  return dispatch => {
    postLoginRequest(payload).then(response => {return response.json()})	
      .then(json => {
        dispatch(postActionConstruct(json, payload, addOrg))
        dispatch({
          type: "SET_GUEST",
          posts: { guest: false },
          receivedAt: Date.now()
        });
      })
  }
}

//https://id.chat.center/oauth/token
export function postLoginRequest(payload){
	  return fetch('https://id.chat.center/oauth/token',
    			{
    				method: 'POST',
    				headers:{
    					'Content-Type': 'application/json'
    				},
	     		 	body: JSON.stringify(payload)
	  })
}