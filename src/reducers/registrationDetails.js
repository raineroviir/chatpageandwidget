const initialState = {
  Organisation:{
    payload:{
      team_description:'',
      team:'',
      first_name:'',
      last_name:'',
      channel:'',
      email:'',
      password:''
    },
    error:'',
    showSuccess: false,
    TeamAvailable:{},
    ChannelAvailable:{}
  }
};

const initialOrganisation = Object.assign({},initialState.Organisation.payload);

export function registrationDetails(state = initialState, action) {
  //alert(action.type)

  switch (action.type) {
  
  case 'REGISTER_ORGANISATION_NAME':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = initialState.Organisation;
    Organisation.payload = (Object.assign(initialState.Organisation.payload, {team_description:action.RegisterOrganisationName}));
    return {
      ...state,
      Organisation
  };

  case 'REGISTER_TEAM':
    //mutate initial state to store the organisation value and create STATE from it
    var regTeam = action.RegisterTeam;
    // if(action.RegisterTeam.indexOf('.chat.center') === -1){
    //   regTeam = action.RegisterTeam+'.chat.center';
    // }

    var Organisation = initialState.Organisation;
    Organisation.payload = (Object.assign(initialState.Organisation.payload, {team:regTeam}));
    return {
      ...state,
      Organisation
  };

  case 'REGISTER_CHANNEL':
    //mutate initial state to store the organisation value and create STATE from it
   
    var Organisation = initialState.Organisation;
    Organisation.payload = (Object.assign(initialState.Organisation.payload, {channel:action.RegisterChannel}));
    return {
      ...state,
      Organisation
  };
  
  
  case 'REGISTER_PASSWORD':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = initialState.Organisation;
    Organisation.payload = (Object.assign(initialState.Organisation.payload, {password:action.RegisterPassword}));
    return {
      ...state,
      Organisation
  };

  case 'REGISTER_PERSONAL_DETAILS':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = initialState.Organisation;
    Organisation.payload = (Object.assign(initialState.Organisation.payload, action.value));
    return {
      ...state,
      Organisation
  };

  case 'REGISTER_INDIVIDUAL_DETAILS':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = initialState.Organisation;
    Organisation.payload = (Object.assign(initialState.Organisation.payload, action.value));
    Organisation.payload.team = null;
    return {
      ...state,
      Organisation
  };

  case 'REGISTER_ORGANISATION_DETAILS':
    var Organisation = initialState.Organisation;
     Organisation.error = action.value.error;
     // if(!!action.value.error){
     //   Organisation.error = (Object.assign(initialState.Organisation.error, action.value.error));
     // }//else{
     //   Organisation = (Object.assign(initialState.Organisation, action));
     // }
    
    return {
      ...state,
      Organisation
  };  
  
  case 'TEAM_AVAILABILITY_RESULT':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = (Object.assign(initialState.Organisation, {TeamAvailable:action.posts}));
    return {
      ...state,
      Organisation
  };

  case 'CHANNEL_AVAILABILITY_RESULT':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = (Object.assign(initialState.Organisation, {ChannelAvailable:action.posts}));
    return {
      ...state,
      Organisation
  };

  case 'RESET_ORGANISATION_DETAILS':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = initialState.Organisation;
    Organisation.payload = Object.assign(initialState.Organisation.payload,initialOrganisation);
    return {
      ...state,
      Organisation
  };

  case 'SUCCESSFUL_REGISTRATION_ACK':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = Object.assign(initialState.Organisation,{successfulRegistration:true});
    return {
      ...state,
      Organisation
  };

  case 'SHOW_SUCCESS_MESSAGE':
    return {
      ...state,
      Organisation: { 
        ...state.Organisation, 
        showSuccess: action.posts.showSuccess
      }
  };
  default:
    return state;
  }

}
