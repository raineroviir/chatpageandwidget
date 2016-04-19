const initialState = {
  Organisation:{
    team_name:'',
    team:'',
    first_name:'',
    last_name:'',
    channel:'',
    email:'',
    password:'',
    error:''
  }
};

export function registrationDetails(state = initialState, action) {
  //alert(action.type)

  switch (action.type) {
  
  case 'REGISTER_ORGANISATION_NAME':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = (Object.assign(initialState.Organisation, {team_name:action.RegisterOrganisationName}));
    return {
      ...state,
      Organisation
  };

  case 'REGISTER_TEAM':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = (Object.assign(initialState.Organisation, {team:action.RegisterTeam}));
    return {
      ...state,
      Organisation
  };

  case 'REGISTER_CHANNEL':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = (Object.assign(initialState.Organisation, {channel:action.RegisterChannel}));
    return {
      ...state,
      Organisation
  };
  
  
  case 'REGISTER_PASSWORD':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = (Object.assign(initialState.Organisation, {password:action.RegisterPassword}));
    return {
      ...state,
      Organisation
  };

  case 'REGISTER_PERSONAL_DETAILS':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = (Object.assign(initialState.Organisation, action.value));
    return {
      ...state,
      Organisation
  };

  case 'REGISTER_INDIVIDUAL_DETAILS':
    //mutate initial state to store the organisation value and create STATE from it
    var Organisation = (Object.assign(initialState.Organisation, action.value));
    delete Organisation.team;
    return {
      ...state,
      Organisation
  };
  default:
    return state;
  }

}
