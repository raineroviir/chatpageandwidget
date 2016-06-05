const initialState = {
  CreateChannel:{
    payload:{
      channel:'',
      description:'',
      avatar:'',
      is_public:'',
      is_group:'',
      is_direct:''
    },
    error:''
  }
};

const initialCreateChannel = Object.assign({},initialState);

export function createChannel(state = initialState, action) {

  switch (action.type) {
  
    case 'CHAT_TYPE':
      var CreateChannel = initialState.CreateChannel;
      CreateChannel.payload = (Object.assign(initialState.CreateChannel.payload, {is_public:action.attr.is_public,is_direct:action.attr.is_direct,is_group:action.attr.is_group}));
      return {
        ...state,
        CreateChannel
      };

    case 'CHAT_DETAILS':
      var CreateChannel = initialState.CreateChannel;
      CreateChannel.payload = (Object.assign(initialState.CreateChannel.payload, {channel:action.attr.channel,description:action.attr.description,avatar:action.attr.avatar}));
      return {
        ...state,
        CreateChannel
      };

    case 'CHAT_ERROR':
      var CreateChannel = initialState.CreateChannel;
      CreateChannel = (Object.assign(initialState.CreateChannel, {error:action.error}));
      return {
        ...state,
        CreateChannel
      };

    case 'RESET_CREATE_CHANNEL':
      var CreateChannel = initialState.CreateChannel;
      CreateChannel = (Object.assign(initialState.CreateChannel, {error:""}))
      CreateChannel.payload = (Object.assign(initialState.CreateChannel.payload, {channel:"",description:"",avatar:"",is_public:"",is_direct:"",is_group:""}));
      return {
        ...state,
        CreateChannel
      };

    default:
      return state;

  }

}
