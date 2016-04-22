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
      value:{"first_name":FirstName,"last_name":LastName,"email":Email,"password":Password,"team_name":"chat.center"}
    })
  }
}

export function submitRegistration(index) {
  //alert('submitRegistration');
  return (dispatch, getState) => {
      return dispatch(postRegistration(getState().registrationDetails.Organisation))
  }
}

function postActionConstruct(json) {
 
  return (dispatch, getState) => {
    dispatch({
      type: 'REGISTER_ORGANISATION_DETAILS',
      value:{"error":json.error}
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

function postRegistration(payload) {
  return dispatch => {
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
export function checkTeamName(team_name) {
   return (dispatch, getState) => {
      return dispatch(teamNameAvailable(team_name))
  }
}

function teamNameAvailable(team_name) {  
  console.log('teamNameAvailable');
  return dispatch => {
    postTeamName(team_name).then(response => {return response.json()})  
      .then(json => dispatch(postTeamAvailabilityResponse(json)))
  }
}

function postTeamName(team_name){
    return fetch('https://api-beta.chat.center/v1/teams.find?team='+team_name)
} 

function postTeamAvailabilityResponse(json) {
  console.log(JSON.stringify(json));
  return {
    type: 'TEAM_AVAILABILITY_RESULT',
    posts: json
  }
}