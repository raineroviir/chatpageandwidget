const initialState = {
  Channel:{
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
    TeamAvailable:{},
    ChannelAvailable:{}
  }
};

const initialChannel = Object.assign({},initialState.Channel.payload);

export function channelDetails(state = initialState, action) {
  //alert(action.type)

  switch (action.type) {
  
  case 'CHANNEL_NAME':
    //mutate initial state to store the organisation value and create STATE from it
    var Channel = initialState.Channel;
    Channel.payload = (Object.assign(initialState.Channel.payload, {team_description:action.ChannelName}));
    return {
      ...state,
      Channel
  };

  default:
    return state;
  }

}
