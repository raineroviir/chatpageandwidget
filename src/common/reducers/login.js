const initialState = {
  user:{
    payload: {
      username:'',
      password:'',
      grant_type:''
    },
    token:{},
    error:''
  },
  loginRequest: ''
};

const initialLoginState = Object.assign({},initialState.user);

export function login(state = initialState, action) {

  switch (action.type) {
    case 'LOGIN_USER':
    console.log(action)
      //mutate initial state to store the organisation value and create STATE from it
      var user = initialState.user;
      user.payload = (Object.assign(initialState.user.payload, action.value));
      return {
        ...state,
        user
      }

    case 'LOGIN_USER_RESPONSE':
      //mutate initial state to store the organisation value and create STATE from it
      var user = initialState.user;
      user = (Object.assign(initialState.user, action.value));
      return {
        ...state,
        user
      }

    case 'RESET_USER_DETAILS':
      //mutate initial state to store the organisation value and create STATE from it
      var user = initialState.user;
      user = Object.assign(initialState.user,initialLoginState);
      return {
        ...state,
        user
    };

    case 'SET_LOGIN_DETAIL_STATE' :
      return {
        ...state,
        ...action.state
      };

    default:
      return state;
    }

}
