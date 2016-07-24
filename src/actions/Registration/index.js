import fetch from 'isomorphic-fetch';
//import postLoginRequest from '../services/common/login';
import * as LoginActions from '../Login';
import urlConfig from '../../url-config';
import { browserHistory } from 'react-router';

export function registerOrganisationName(RegisterOrganisationName) {
  //alert(dispatch);
  return (dispatch, getState) => {
    dispatch({
      type: 'REGISTER_ORGANISATION_NAME',
      RegisterOrganisationName
    })
    // LoginActions.loginUser("ravish", "password");
    // dispatch(LoginActions.submitLogin());
  }
}

export function registerTeam(RegisterTeam) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_TEAM',
      RegisterTeam
    })
  }
}

export function registerPersonalDetails(FirstName,LastName,Email) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_PERSONAL_DETAILS',
      value:{"first_name":FirstName,"last_name":LastName,"email":Email}
    })
  }
}

export function registerChannel(RegisterChannel) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_CHANNEL',
      RegisterChannel
    })
  }
}

export function fetchMemebers () {
  return dispatch => {
    teamMembersList().then(response => response.json())
      .then(json => dispatch(membersListDispatch(json.users)))
  }
}

export function registerPassword(RegisterPassword) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_PASSWORD',
      RegisterPassword
    })
  }
}

export function registerIndividualDetails(FirstName,LastName,Email,Password) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_INDIVIDUAL_DETAILS',
      value:{"first_name":FirstName,"last_name":LastName,"email":Email,"password":Password,"team_description":"chat.center"}
    })
  }
}

export function submitRegistration(isIndividual, emails) {
  //alert('submitRegistration');
  return (dispatch, getState) => {
    return dispatch(postRegistration(getState().registrationDetails.Organisation.payload, isIndividual))
  }
}
export function inviteMembers (emails) {
  return (dispatch, getState) => {
    try{
      var token;
      if (typeof(Storage) !== "undefined") {
        token = JSON.parse(localStorage.getItem("token")).access_token;
      }
      else{
        token = getState().loginDetails.User.token.access_token;
      } 
      fetchUserInfo(token).then(response => {return response.json()})
        .then(json => {
          return addMembers(json.user.team.id, emails, token).then(response => {return response.json()})   
        })
        .then(json => {
          if(json.ok){
            dispatch(inviteStatus(true));
          }
        });
    }
    catch(e){
      
    }
  }
}
export function clearMessages () {
  return dispatch => dispatch({
    type: "CLEAR_MESSAGE",
    recievedAt: Date.now()
  })
}

export function deleteMember(member) {
  return dispatch => {
    deleteteamMember(member.id).then(response => response.json())
      .then(json => dispatch(deleteMemberDispatch(json.ok, member)))
  }
}

function deleteMemberDispatch (status, member) {
  return {
    type: "DELETE_SUCCESS",
    posts: { status, member},
    recievedAt: Date.now()
  }
}

function teamMembersList(){
    var url =  urlConfig.base + 'teams.members.list';
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    return fetch(url,
      {
        method: 'GET',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
        }
    })
}
function deleteteamMember(id){
    var url =  urlConfig.base + 'teams.members.delete';
    if (typeof(Storage) !== "undefined") {
      var token = JSON.parse(localStorage.getItem("token"));
    }
    return fetch(url,
      {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token.access_token
        },
        body: JSON.stringify({ user_id: id})
    })
}

function membersListDispatch (users) {
  return {
    type: "TEAM_MEMBERS",
    posts: users,
    recievedAt: Date.now()
  }
}

function inviteStatus() {
  return {
    type: "SHOW_SUCCESS_MESSAGE",
    posts: { showSuccess: true},
    recievedAt: Date.now()
  }
};
function fetchUserInfo(token) {
  return fetch( urlConfig.base + 'users.me', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
}
function addMembers(team, emails, token) {
  return fetch( urlConfig.base + '/teams.members.create', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({ user_emails: emails, team_id: team})
  })
}

function postActionConstruct(json, isIndividual) {
 
  return (dispatch, getState) => {
    
    // dispatch({
    //   type: 'REGISTER_ORGANISATION_DETAILS',
    //   value:{"error":json.error}
    // })

    dispatch({
      type:'RESET_USER_DETAILS'
    });

    if(json){

      if(!json.ok){
        dispatch({
          type: 'REGISTER_ORGANISATION_DETAILS',
          value:{"error":json.error}
        });
        return;
      }

      var payload = getState().registrationDetails.Organisation.payload, 
        username = ((payload.team) ? (payload.team + '.chat.center/') : 'chat.center/' ) + payload.channel,
        password = payload.password;

      dispatch(LoginActions.loginUser(username, password));
      dispatch(LoginActions.submitLogin(getState().orgs.addOrg, !isIndividual));          

      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("user_channel", payload.channel);
      }
      // TODO: Need to reset org details after successful registration followed by successful login
      // dispatch({
      //   type:'RESET_ORGANISATION_DETAILS'
      // })

      dispatch({
        type:'SUCCESSFUL_REGISTRATION_ACK'
      })       
    }   
  }
}

function postRegistration(payload1, isIndividual) {
  return dispatch => {
    var payload = Object.assign({},payload1);
    if(payload.team !== null)
      payload.team = payload.team+'.chat.center';
    postLoginRequest(payload).then(response => {return response.json()})	
      .then(json => dispatch(postActionConstruct(json, isIndividual)))
  }
}


function postLoginRequest(payload){
	  return fetch(urlConfig.base + 'users.signup',
    			{
    				method: 'POST',
    				headers:{
    					'Content-Type': 'application/json'
    				},
	     		 	body: JSON.stringify(payload)
	  })
}

/**/
export function checkTeamName(team_description) {
  //if(!team_description) return;

  return (dispatch, getState) => {
    if(!team_description){
      dispatch({
        type: 'TEAM_AVAILABILITY_RESULT',
        posts:{}
      })
    }
    return dispatch(teamNameAvailable(team_description))
  }
}

function teamNameAvailable(team_description) {  
  //console.log('teamNameAvailable');
  return dispatch => {
    postTeamName(team_description).then(response => {return response.json()})  
      .then(json => dispatch(postTeamAvailabilityResponse(json)))
  }
}

function postTeamName(team_description){
    return fetch(urlConfig.base + 'teams.find?team='+team_description)
} 

function postTeamAvailabilityResponse(json) {
  console.log(JSON.stringify(json));
  // if(!json.ok){
  //   return {
  //     type: 'TEAM_AVAILABILITY_RESULT',
  //     posts:{}
  //   }
  // }

  return {
    type: 'TEAM_AVAILABILITY_RESULT',
    posts: json
  }
}

export function checkChannelName(register_channel, team_description) {
   return (dispatch, getState) => {
      return dispatch(channelNameAvailable(register_channel))
  }
}

function channelNameAvailable(register_channel, team_description) {  
  console.log('channelNameAvailable');
  return dispatch => {
    postChannelName(register_channel, team_description).then(response => {return response.json()})  
      .then(json => dispatch(postChannelAvailabilityResponse(json)))
  }
}

function postChannelName(register_channel, team_description){
    return fetch(urlConfig.base + 'channels.find?channel='+ register_channel + '&team=' + team_description)
} 

function postChannelAvailabilityResponse(json) {
  return {
    type: 'CHANNEL_AVAILABILITY_RESULT',
    posts: json
  }
}