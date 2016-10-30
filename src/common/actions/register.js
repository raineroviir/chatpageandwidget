import Config from '../config';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
import {loginUser, submitLogin} from './login'
// import {fetchUserInfo} from './user'

export function registerOrganizationName(organizationName) {
  return (dispatch, getState) => {
    console.log(organizationName)
    // postLoginRequest(organizationName).then(val => console.log(val))
    dispatch({
      type: 'REGISTER_ORGANIZATION_NAME',
      organizationName
    })
  }
}

export function registerTeam(registerTeam) {
  return dispatch => {
      dispatch({
      type: 'REGISTER_TEAM',
      registerTeam: registerTeam
    })
  }
}

export function ownDomainStateFunction(ownDomainState, ownDomainValue) {
  return dispatch => {
      dispatch({
      type: 'OWN_DOMAIN',
      ownDomainState,
      ownDomainValue
    })
  }
}

export function registerPersonalDetails(FirstName,LastName,Email) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_PERSONAL_DETAILS',
      first_name:FirstName,
      last_name:LastName,
      email:Email
    })
  }
}

export function registerPersonalDetailsJoin(InviteToken,FirstName,LastName,Password,TeamName) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_PERSONAL_DETAILS_JOIN',
      value:{"invite_token":InviteToken,"first_name":FirstName,"last_name":LastName,"password":Password,"team_name":TeamName}
    })
  }
}

export function registerChannel(RegisterChannel) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_CHANNEL',
      RegisterChannel: RegisterChannel
    })
  }
}

export function registerChannelJoin(RegisterChannel) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_CHANNEL_JOIN',
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
      value:{"first_name":FirstName,"last_name":LastName,"email":Email,"password":Password,"team_description":window.config.cc}
    })
  }
}

export function submitRegistration(password) {
  return (dispatch, getState) => {
    let userPayload = getState().register.payload
    userPayload.password = password
    return dispatch(postRegistration(userPayload))
  }
}

export function submitJoinRegistration(isIndividual, emails) {
  return (dispatch, getState) => {
    return dispatch(postJoinRegistration(getState().register.joinDetails))
  }
}

export function inviteMembers (emails) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_SEND_INVITE_REQ_STATUS',
      value: 'loading'
    });
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
            if (typeof(Storage) !== "undefined") {
              //window.location.hash = "#/" + localStorage.getItem("user_channel");
              browserHistory.push("/dashboard/" + localStorage.getItem("user_channel"));
              localStorage.setItem("user_channel", "");
            }
          }
          dispatch({
            type: 'SET_SEND_INVITE_REQ_STATUS',
            value: 'loaded'
          });


        });
    }
    catch(e){
      dispatch({
        type: 'SET_SEND_INVITE_REQ_STATUS',
        value: ''
      });
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
    var url =  Config.api + '/teams.members.list';
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
    var url =  Config.api + '/teams.members.delete';
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
  return fetch( Config.api + '/users.me', {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
}
function addMembers(team, emails, token) {
  return fetch( Config.api + '/teams.members.create', {
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
    if(json){
      console.log(json)
      dispatch({
        type: "RECEIVED_USER_INFO",
        user: json.user
      })
      // if(!json.ok){
      //   dispatch({
      //     type: 'REGISTER_ORGANISATION_DETAILS',
      //     value:{"error":json.error}
      //   });
      //   return;
      // }

      var payload = getState().register.payload,
        username = ((payload.team) ? (payload.team + '.'+ window.config.cc +'/') : window.config.cc + '/' ) + payload.channel,
        password = payload.password;

      //If incase owndomain is selected
      if(getState().register.ownDomain){
        username = getState().register.ownDomainValue + '/' + payload.channel;
      }

      dispatch(loginUser(username, password));
      // dispatch(submitLogin(getState().orgs.addOrg, !isIndividual));

      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("user_channel", payload.channel);
      }
      // TODO: Need to reset org details after successful registration followed by successful login
      // dispatch({
      //   type:'RESET_ORGANIZATION_DETAILS'
      // })
      //
      // dispatch({
      //   type:'SUCCESSFUL_REGISTRATION_ACK'
      // })
    }
  }
}

function postJoinActionConstruct(json) {

  return (dispatch, getState) => {

    // dispatch({
    //   type:'RESET_USER_DETAILS'
    // });

    if(json){

      if(!json.ok){
        dispatch({
          type: 'REGISTER_JOIN_DETAILS',
          value:{"error":json.error}
        });
        return;
      }

      var payload = getState().register.joinDetails,
        username = payload.team_name + '/' + payload.username,
        password = payload.password;

      dispatch(loginUser(username, password));
      // dispatch(submitLogin(getState().orgs.addOrg));

      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("user_channel", payload.channel);
      }

      dispatch({
        type:'SUCCESSFUL_REGISTRATION_ACK'
      })
    }
  }
}

export function clearJoinErrorValue() {
  return (dispatch, getState) => {
      dispatch({
      type: 'CLEAR_JOIN_VALUE',
    })
  }
}

function postRegistration(payload1) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_SIGNUP_REQ_STATUS',
      value: 'loading'
    });
    var OrgObject = getState().register
    var payload = Object.assign({},payload1);
    payload.team = payload.teamDomain
    if(payload.team !== null)
      payload.team = payload.team+'.' + window.config.cc;
    if(OrgObject.ownDomain){
      payload.team = OrgObject.ownDomainValue;
    }
    console.log(payload)
    postLoginRequest(payload).then(response => {return response.json()})
      .then(json => {
        console.log(json)
        dispatch(postActionConstruct(json));
        dispatch({
          type: 'SET_SIGNUP_REQ_STATUS',
          value: 'loaded'
        });

      })
  }
}

function setUserInfo(payload) {
  return {
    type: "SETTING_USER_INFO",
    payload
  }
}
export function postLoginRequest(payload){
  console.log(payload)
  return fetch(Config.api + '/users.signup',
  	{
  		method: 'POST',
  		headers:{
  			'Content-Type': 'application/json'
  		},
		 	body: JSON.stringify(payload)
  })
}

function postJoinRegistration(payload1) {
  return dispatch => {
    var payload = Object.assign({},payload1);
    postJoinRequest(payload).then(response => {return response.json()})
      .then(json => dispatch(postJoinActionConstruct(json)))
  }
}

function postJoinRequest(payload){
    return fetch(Config.api + '/teams.invite.accept',
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
    return fetch(Config.api + '/teams.find?team='+team_description)
}

function postTeamAvailabilityResponse(json) {
  //console.log(JSON.stringify(json));
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
  //console.log('channelNameAvailable');
  return dispatch => {
    postChannelName(register_channel, team_description).then(response => {return response.json()})
      .then(json => dispatch(postChannelAvailabilityResponse(json)))
  }
}

function postChannelName(register_channel, team_description){
    return fetch(Config.api + '/channels.find?channel='+ register_channel + '&team=' + team_description)
}

function postChannelAvailabilityResponse(json) {
  return {
    type: 'CHANNEL_AVAILABILITY_RESULT',
    posts: json
  }
}
