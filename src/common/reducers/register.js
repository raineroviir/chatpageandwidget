const initialState = {
  address: "",
  payload:{
    team_description:'',
    teamDomain:'',
    first_name:'',
    last_name:'',
    channel:'',
    email:'',
    password:''
  },
  error:'',
  organizationName: "",
  joinError:'',
  showSuccess: false,
  deleteSuccess: false,
  ownDomain: false,
  ownDomainValue: '',
  TeamAvailable:{},
  ChannelAvailable:{},
  members: [],
  MemberAvailable:{},
  joinDetails:{
    team_name:'',
    invite_token:'',
    username:'',
    first_name:'',
    last_name:'',
    password:''
  },
  sendInviteRequestStatus: '',
  signupRequestStatus: '',
  finished_process: false
};

export function register(state = initialState, action) {
  switch (action.type) {
    case 'REGISTER_ORGANIZATION_NAME':
      return {
        ...state, organizationName: action.organizationName,
        payload: {...state.payload, team_description: action.organizationName}
      }
    case 'REGISTER_TEAM':
      return {
        ...state,
        payload: {...state.payload, teamDomain: action.registerTeam}
    };
    case 'REGISTER_CHANNEL':
      return {
        ...state,
        payload: {...state.payload, channel:action.RegisterChannel}
    };

    case 'REGISTER_CHANNEL_JOIN':
      return {
        ...state,
        joinDetails: {...state.joinDetails, username:action.RegisterChannel}
    };
    case 'REGISTER_PASSWORD':
      return {
        ...state,
        payload: {...state.payload, password:action.RegisterPassword}
    };

    case 'REGISTER_PERSONAL_DETAILS':
    console.log(action)
      return {
        ...state,
        payload: {...state.payload, first_name: action.first_name, last_name: action.last_name, email: action.email}
    };

    case 'REGISTER_PERSONAL_DETAILS_JOIN':
      return {
        ...state,
        joinDetails: {...state.joinDetails, personal_details: action.value}
    };

    case 'REGISTER_INDIVIDUAL_DETAILS':
      return {
        ...state,
        payload: {...state.payload, team: null, personal_details: action.value}
    };

    case 'REGISTER_ORGANIZATION_DETAILS':
      return {
        ...state,
        error: action.value.error
    };

    case 'REGISTER_JOIN_DETAILS':
      return {
        ...state,
        error: action.value.error
    };

    case 'CLEAR_JOIN_VALUE':
        return {
          ...state,
          joinError: ""
      };

    case 'TEAM_AVAILABILITY_RESULT':
      return {
        ...state,
        TeamAvailable: action.posts
    };

    case 'OWN_DOMAIN':
      return {
        ...state, ownDomain: action.ownDomainState, ownDomainValue: action.ownDomainValue
    };

    case 'CHANNEL_AVAILABILITY_RESULT':
      return {
        ...state,
        ChannelAvailable:action.posts
    };

    case 'RESET_ORGANISATION_DETAILS':
      return {
        ...state,
        payload: initialState.payload
    };

    case 'SUCCESSFUL_REGISTRATION_ACK':
      return {
        ...state,
        successfulRegistration:true
    };

    case 'SHOW_SUCCESS_MESSAGE':
      return {
        ...state,
        showSuccess: true
    };

    case 'CLEAR_MESSAGE':
      return {
        ...state,
        deleteSuccess: false,
        showSuccess: false
    };

    case 'TEAM_MEMBERS':
      return {
        ...state,
          members: action.posts
      }

    case 'DELETE_SUCCESS':
      if(!action.posts.status) return state;
      return {
        ...state,
        members: state.members.filter(member => member.id != action.posts.member.id),
        deleteSuccess: true
      }

    case 'SET_SEND_INVITE_REQ_STATUS': {
      return {
        ...state,
        sendInviteRequestStatus: action.value
      }
    }

    case 'SET_SIGNUP_REQ_STATUS': {
      return {
        ...state,
        signupRequestStatus: action.value
      }
    }
    case 'FINISHED_REGISTRATION_PROCESS': {
      return {...state, finished_process: true}
    }
    default: return state;
  }
}
