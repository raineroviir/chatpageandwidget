import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { render } from 'react-dom';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';
import TabNav from '../../components/TabNav';
import * as ChatPageActions from '../../actions/ChatPage';
import * as tabNavActions from '../../actions/TabNav'

import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { styles} from './styles.scss';
// 
const metaData = {
  title: 'Chat Page | Chat Center',
  description: 'Chat Page',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class ChatPage extends Component {
  

  constructor( props ){
    super( props );
    this.state = {
      tabFooter : <div >Questions? <a href="javascript:;">Chat with us</a></div>,
      tabLinks: [
        
        {
          toLink: '/ChatPage/appearance',
          label: 'Appearance'
        },
        {
          toLink: '/ChatPage/labels',
          label: 'Labels & Localization'
        }

      ]
    }
  }
  
  componentWillMount() {
    if( !this.props.conversations.channelid ) {
      browserHistory.push("/dashboard");
    } else {
      console.log("container chat channel id................."+this.props.conversations.channelid );
       this.props.actions.initChatPageConfig( this.props.conversations.channelid );
    }

  }
  saveChatPageConfig( e ) {
      e.preventDefault();
      let activeChannelDetails = {};
      if( this.props.channels ){
        activeChannelDetails = this.props.channels.channels.all.find( channel => channel.id == this.props.conversations.channelid );
      }
      this.props.actions.saveChatPageConfig( this.props.chatPageConfig, this.props.conversations.channelid, this.props.chatPage.isNewChannelConfig, activeChannelDetails.name );
  }

  render() {
    let classId = this.props.chatPage ? this.props.chatPage.classId : '';
    let unsavedChanges = 0;
    let originalConfig = this.props.chatPage.initialConfig;
    let currentConfig = this.props.chatPageConfig;
    
    let checkObjDiff = ( currentInner, orgInner ) => {
      for( let key in currentInner ) {
        
        if( key === 'rules' ) {

          if( JSON.stringify(orgInner.rules ) != JSON.stringify(currentInner.rules ) ) {
            unsavedChanges++;
          }

        
          
        } else if( typeof currentInner[ key ] === 'object' && typeof orgInner[ key ] === 'object' ) {
          checkObjDiff( currentInner[ key ], orgInner[ key ]  );
        }
        else if( orgInner[ key ] != currentInner[ key ] ) {
          unsavedChanges++;
        }
      }  
    };
    if( currentConfig && originalConfig ) {
      checkObjDiff( currentConfig, originalConfig );  
    }
    

    let isNewChannelConfig = this.props.chatPage.isNewChannelConfig;
    let activeChannelDetails = {};
    if( this.props.channels ){
      activeChannelDetails = this.props.channels.channels.all.find( channel => channel.id == this.props.conversations.channelid );
    }
    
    
    return (

      <div>
        <DocumentMeta {...metaData} />
        <Navigation historyApi={this.props.historyApi} />
        <div className={"widget-component " + (this.props.tabnav.menuState? 'open-widget-menu' : '') }  >
          
          <TabNav tabFooter= {
            this.state.tabFooter
          }

          links= {
            this.state.tabLinks
          }


          />
          <div className="widget-content" >

            <div className={ "widget-" + classId }>
              
              <div className="widget-feature-buttons">
                <span className="save-button-wrapper">
                  {
                    unsavedChanges > 0 && !isNewChannelConfig ? 
                    <p className="form-change-status" >{unsavedChanges} unsaved changes</p>
                    :
                    ''
                  }
                  
                  <button 
                  className="cc-btn save-button" 
                  disabled={unsavedChanges==0}
                  onClick={this.saveChatPageConfig.bind(this)}>PUBLISH CHANGES</button>
                </span>

                <Link to={"/dashboard/" + activeChannelDetails.name } className="widget-close">
                </Link>
              </div>
              <div className="email-camp-channel">
                  <span className="email-icon-wrapper">
                      <span className="msg-env"></span>
                  </span>
                  Email Campaign channel
              </div>

              <h1 className="widget-title">
                  Chat page setup
              </h1>
              {
               this.props.chatPage.error ? <div className="common-error-message">
                  {this.props.chatPage.error}
                </div> : ''
              }
              {this.props.children}
            </div>
            <div className="widget-save-button-bottom">
                {
                  unsavedChanges>0 && !isNewChannelConfig
                  ?<p className="form-change-status" >{unsavedChanges} unsaved changes</p>:
                  ''
                }
                <button className="cc-btn save-button" 
                  disabled={unsavedChanges==0}
                 onClick={this.saveChatPageConfig.bind(this)}>PUBLISH CHANGES</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChatPage.propTypes = {
  // todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    chatPageConfig: state.chatPageConfig,
    chatPage: state.chatPage,
    historyApi: state.historyApi,
    chatPage: state.chatPage,
    channels: state.channels,
    tabnav: state.tabnav
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatPageActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatPage);