const initialState = {
  User:{
    username:'',
    password:'',
    grant_type:'',
    token:{},
    error:''
  }
};

const initialLoginState = Object.assign({},initialState.User);

export function loginDetails(state = initialState, action) {
  //alert(action.type)

  switch (action.type) {
  
    case 'LOGIN_USER':
      //mutate initial state to store the organisation value and create STATE from it
      var User = (Object.assign(initialState.User, action.value));
      return {
          ...state,
          User
      };

    case 'RESET_USER_DETAILS':
      //mutate initial state to store the organisation value and create STATE from it
      var User = Object.assign(initialState.User,initialLoginState);
      return {
        ...state,
        User
    };

    default:
      return state;
    }

}
