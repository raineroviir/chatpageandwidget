import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ChatWidget from './ChatWidget/ChatWidget'
import { bindActionCreators } from 'redux'
import { styles } from './styles.scss'
import { initUser, fetchUserInfo } from '../../common/actions/user'
import { getWidget } from '../actions/widget'
import { initEnvironment, storeUserScrollPosition
 } from '../../common/actions/environment'
import { checkForConversation } from '../../common/actions/conversations'
import { createWidgetChannel, fetchChannelInfo, fetchChannel, fetchSocket} from '../../common/actions/channels'
import {createMessage} from '../../common/actions/messages'
import {widgetToggle} from '../../common/actions/environment'
import MiniWidget from '../Components/MiniWidget'
import AvatarOne from '../Containers/ChatWidget/files/bullbasaur.svg'

import moment from 'moment'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false,
      miniWidgetShow: true
    }
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch({type: "BEGUN_INITIAL_LOADING"})
  }
  componentDidMount() {
    const { dispatch, channel_url } = this.props
    // clearing storage has its drawbacks as well for now it's off for testing
    // localStorage.clear()
    // setting some dummy data here for now while we get the actual data flow set up
    const data = {email: "placeholder"}
    const index = channel_url.indexOf('/')
    const channelname = channel_url.slice(index + 1)
    const team = channel_url.slice(0,index)
    dispatch(initEnvironment())
    dispatch(initUser(data))
    .then((token) => {
      dispatch(fetchSocket(token))
      dispatch(fetchChannel(channelname, team, token)).then((channel) => {
        dispatch(getWidget(channel.id, channel_url, token)).then(() => dispatch({type: "FINISHED_INITIAL_LOADING"}))
        dispatch(checkForConversation(channel.id, token))
        // dispatch({type: "STORE_CHANNEL_INFO", channelId: channel_id, channelUrl: channel_url})
      }).catch(error => console.log(error))
    }).catch(error => console.log(error))
  }
  onCloseMiniWidget() {
    this.setState({miniWidgetShow: !this.state.miniWidgetShow})
  }
  onToggle() {
    const { dispatch } = this.props
    this.setState({ show: !this.state.show });
    dispatch(widgetToggle())
  }
  render() {
    const { widget, environment, messages } = this.props
    if (environment.initialLoading) {
      return null
    }
    const lastMessage = messages.messagesWhileInactive ? messages.messagesWhileInactive[messages.messagesWhileInactive.length - 1] : null
    const teamChannelUrl = widget.initialConfig.channelUrl ||  "seaShells.com"
    // console.log(lastMessage.text)
    return (
      <div>
        {environment.inactive && messages.messagesWhileInactive.length > 0 && lastMessage.text &&
        <div className="proactive-notification-container">
          <div style={{display: "flex", flexDirection: "column"}}>
            {this.state.miniWidgetShow && <MiniWidget onToggle={this.onToggle.bind(this)} widget={widget} onClose={this.onCloseMiniWidget.bind(this)}/>}
            {this.state.miniWidgetShow && <div style={{alignSelf: "flex-end"}}>
              <div style={{padding: "10 0 0 0"}}></div>
              <div onClick={this.onToggle.bind(this)} style={{cursor: "pointer", borderRadius: "30px", width: "48px", height: "48px", boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)", backgroundColor: "white", alignSelf: "flex-end"}}></div>
              <div style={{padding: "40 0 0 0"}}></div>
            </div>}
          </div>
          <div style={{alignSelf: "flex-end", boxShadow: "0 1px 5px rgba(0, 50, 100, 0.25)", borderRadius: "5px", padding: "5px", margin: "0 0 0 20px"}}>
            <div>
              {lastMessage.text.length > 121 ? `${lastMessage.text.slice(0, 121).trim()}...` : `${lastMessage.text}`}
            </div>
          </div>
        </div>
        }
        {messages.messagesList.length === 0 ? <div className="minimized-welcome-message">
          {!this.state.show && this.state.miniWidgetShow && <MiniWidget onToggle={this.onToggle.bind(this)} widget={widget} onClose={this.onCloseMiniWidget.bind(this)} />}
        </div> : null}
        <div className="chat-widget-button" style={{backgroundColor: widget.initialConfig.keyColor,
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: messages.messagesWhileInactive.length > 0 ?
          //  `url(${lastMessage.sender_avatar})` :
            `url(${AvatarOne})` : null}}
        onClick={this.onToggle.bind(this)}>
          {messages.messagesWhileInactive.length > 0 && <div style={{backgroundColor: widget.initialConfig.keyColor}} className="unread-message-bubble">
            <div style={{alignSelf: 'center'}}>{messages.messagesWhileInactive.length}</div>
          </div>}
        </div>
        {this.state.show && <ChatWidget onClose={this.onToggle.bind(this)} dispatch={this.props.dispatch} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { widget, environment, messages, guest, user, channels, conversations } = state
  return {
    widget,
    environment,
    messages,
    guest,
    user,
    channels,
    conversations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
