import fetch from 'isomorphic-fetch';
//import postLoginRequest from '../services/common/login';

export function registerOrganisationName(RegisterOrganisationName) {
  return (dispatch, getState) => {
      dispatch({
      type: 'REGISTER_ORGANISATION_NAME',
      RegisterOrganisationName
    })
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

export function submitRegistration(index) {
  //alert('submitRegistration');
  return (dispatch, getState) => {
      return dispatch(postRegistration(getState().registrationDetails.Organisation.payload))
  }
}

function postActionConstruct(json) {
 
  return (dispatch, getState) => {
    dispatch({
      type: 'REGISTER_ORGANISATION_DETAILS',
      value:{"error":json.error}
    })

    dispatch({
      type:'RESET_USER_DETAILS'
    })

    if(json.ok){
        dispatch({
          type:'RESET_ORGANISATION_DETAILS'
        })

        dispatch({
          type:'SUCCESSFUL_REGISTRATION_ACK'
        })

        window.location.hash = "#/login";
        //reset Organidation Details once successfully signed up
        
    }
    
  }
}

function postRegistration(payload1) {
  return dispatch => {
    var payload = Object.assign({},payload1);
    if(payload.team !== null)
      payload.team = payload.team+'.chat.center';
    postLoginRequest(payload).then(response => {return response.json()})	
      .then(json => dispatch(postActionConstruct(json)))
  }
}

//https://id.chat.center/oauth/token
function postLoginRequest(payload){
	  return fetch('https://api-beta.chat.center/v1/users.signup',
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

   return (dispatch, getState) => {
       dispatch({
        type: 'TEAM_AVAILABILITY_RESULT',
        posts:{}
      })
      return dispatch(teamNameAvailable(team_description))
  }
}

function teamNameAvailable(team_description) {  
  console.log('teamNameAvailable');
  return dispatch => {
    postTeamName(team_description).then(response => {return response.json()})  
      .then(json => dispatch(postTeamAvailabilityResponse(json)))
  }
}

function postTeamName(team_description){
    return fetch('https://api-beta.chat.center/v1/teams.find?team='+team_description)
} 

function postTeamAvailabilityResponse(json) {
  console.log(JSON.stringify(json));
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
    return fetch('https://api-beta.chat.center/v1/channels.find?channel='+ register_channel + '&team=' + team_description)
} 

function postChannelAvailabilityResponse(json) {
  console.log(JSON.stringify(json));
  return {
    type: 'CHANNEL_AVAILABILITY_RESULT',
    posts: json
  }
}