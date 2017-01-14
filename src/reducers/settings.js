const initialState = {
    initialized: false,
    errorMessage: false,
    editSettings: {
        first_name: '',
        last_name: '',
        email: '',
        personal_chat_address: '',
        organizationName: '',
        team_id: '',
        ccdomain: '',
        ownDomain: '',
        username: '',
        org_avatar: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTOLxYk4-Pid7UmTM803YWqHXbrB8_4O0s3hxHMSpoA0LiNUTIrIX2Dkg',
        personal_avatar: ''
    },
    chat_center_domain: false,
    organizationFormInValid: false,
    personalFormInValid: false
};

export function settings(state = initialState, action) {

  switch ( action.type ) {

    case 'SETTINGS_INITIALIZE': 
        let original = {
            first_name: action.userinfo.first_name,
            last_name: action.userinfo.last_name,
            personal_chat_address: action.userinfo.username,
            email: action.userinfo.email,
            personal_avatar: action.userinfo.avatar_96,
            personal_avatar_upload: ''
        };
        let index = -1;
        if(  action.userinfo.team ) {
            original.organizationName = (action.userinfo.team.full_name ||
                              action.userinfo.team.description);
            original.team_id = action.userinfo.team.id;
            original.ownDomain =  action.userinfo.team.name;
            index = original.ownDomain.indexOf( '.' + window.config.cc  );

        }
        
        if( index != -1 ) {
            original.ccdomain = original.ownDomain.substring(0, index );
            original.ownDomain = '';
            state = {
                ...state,
                chat_center_domain: true
            };
        } else {
            state = {
                ...state,
                chat_center_domain: false
            }
        }
        
        if( !state.initialized && original.first_name ) {
            return {
                ...state,
                editSettings: {
                    ...state.editSettings,
                    ...original

                },
                initialized: true
            };
        } else {
            return state;
        }
        break;
    case 'UPDATE_EDIT_SETTINGS': 
        return {
            ...state,
            editSettings: {
                ...state.editSettings,
                ...action.newState
            }
        }
    case 'RESET_EDIT_SETTINGS': 
        return {
            ...state,
            initialized: false,
            editSettings: {
                ...initialState.editSettings
            }
        }
    case 'SETTINGS_SET_STATE': 
        return {
            ...state,
            ...action.newState
        }

    default: 
        return state;
  }
}
