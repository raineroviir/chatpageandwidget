const CHANGE_SELECTED_TAB = 'CHANGE_SELECTED_TAB';
import Config from '../../config';
import { browserHistory } from 'react-router';
import ApiService  from '../../api.service';



export function initChatPageConfig( channelid ) {
  console.log("inside action .."+channelid);
    return ( dispatch, getState ) => {

      let state = getState();
      dispatch({
        type: 'SHOW_LOADER'
      });
      console.log("inside action .before dispatch..."+channelid);
      // initialize the error with empty
      dispatch({
        type: 'CHATPAGE_UPDATE_STATE',
        newState: {
          error: false
        }
      });
      ApiService.api( {
        action: "chatpage.details",
        payload: {
          channel_id: channelid
        }
      } )
      .then( res => {
        console.log("response ...................."+res.json);
          let plan = state.userinfo.userinfo.plan;
          let userPlan = 'free';
          if( plan && plan.stripe_id ) {
            userPlan = plan.stripe_id;
          } 
          
          if( res && res.channel ) {
            if( userPlan != 'premium' ) {
              res.ccBranding = false;
            }
          }

          dispatch({
            type: 'CHATPAGE_UPDATE_KEY',
            key: 'isNewChannelConfig',
            value: !(res && res.channel)
          })
          dispatch({
            type: 'INIT_CHATPAGE_CONFIG',
            data: res,
            channelid: channelid
          });
          dispatch({
            type: 'INIT_CHATPAGE_CONFIG_INITIAL_STATE',
            data: res
          });
          dispatch({
            type: 'HIDE_LOADER'
          });
        },
        err => {  
          console.log("inside action .error..."+err.error);
          dispatch({
            type: 'HIDE_LOADER'
          });

          dispatch({
            type: 'CHATPAGE_UPDATE_STATE',
            newState: {
              error: err.error
            }
          });
        }
      )
    }
}

export function updateChatPageKey( obj ) {
  console.log("updateChatPageKey..."+obj);
  return dispatch => (
        dispatch({
          type: 'CHATPAGE_UPDATE_KEY',
          key: obj.key,
          value: obj.value
        })
    )
}

export function saveChatPageConfig( config, channelid, isNewChannelConfig, activeChannelName ) {
  console.log("saveChatPageConfig..."+channelid);
  let payload = {
    channel_id: channelid,
    chat_page_configuration: config
  };
  let method = 'chatpage.update';
  if( isNewChannelConfig ) {
    method = 'chatpage.create';
  } 

 

  return dispatch => {

      dispatch({
        type: 'CHATPAGE_UPDATE_STATE',
        newState: {
          error: false
        }
      });
      dispatch({
        type: 'SHOW_LOADER'
      });
      ApiService.api({
        action : method,
        payload: payload
      })
      .then( json => {
        /*if( isNewChannelConfig ) {
          dispatch({
            type: 'WIDGET_UPDATE_KEY',
            key: 'isNewChannelConfig',
            value: false
          });
        }
        let message = 'Updated Successfully';
        if( isNewChannelConfig ) {
          message = 'Created Successfully';
        }
        dispatch({
          type: 'INIT_WIDGET_CONFIG_INITIAL_STATE',
          data: config
        })*/
        dispatch({
          type: 'HIDE_LOADER'
        });
        browserHistory.push("/dashboard/" + activeChannelName );
        //alert( message );
      }, err => {
        dispatch({
          type: 'HIDE_LOADER'
        });
        dispatch({
          type: 'CHATPAGE_UPDATE_STATE',
          newState: {
            error: err.error
          }
        });
      } )
  }
    
}

export function updateKey ( obj ) {
    console.log("updateKey..."+obj);
  return dispatch => (
        dispatch({
          type: 'CHATPAGE_CONFIG_UPDATE_KEY',
          key: obj.key,
          value: obj.value
        })
    )
}


export function updateChatPageConfigState ( obj ) {
  console.log("updateChatPageConfigState..."+obj);
  return dispatch => (
        dispatch({
          type: 'CHATPAGE_CONFIG_UPDATE_STATE',
          newState: obj
        })
    )
}