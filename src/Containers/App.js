import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ChatWidget from './ChatWidget/ChatWidget'
import { bindActionCreators } from 'redux'
import { styles } from './styles.scss'
import { initUser, fetchUserInfo } from '../actions/user'
import { getWidget } from '../actions/widget'
import { initEnvironment, storeUserScrollPosition
 } from '../actions/environment'
import { checkForConversation } from '../actions/conversations'
import { createWidgetChannel, fetchChannelInfo, fetchChannel} from '../actions/channels'
import {loadServerMsgs} from '../actions/messages'
import {widgetToggle} from '../actions/environment'
import AvatarOne from './ChatWidget/files/bullbasaur.svg'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch({type: "BEGUN_INITIAL_LOADING"})
  }
  componentDidMount() {
    const { dispatch, channel_url } = this.props
    // setting some dummy data here for now while we get the actual data flow set up
    const data = {email: "placeholder"}
    console.log(channel_url)
    const index = channel_url.indexOf('/')
    const channelname = channel_url.slice(index + 1)
    const team = channel_url.slice(0,index)
    dispatch(initEnvironment())
    dispatch(initUser(data))
    .then((token) => {
      token = token.access_token
      dispatch(fetchChannel(channelname, team, token)).then((channel_id) => {
        dispatch(getWidget(channel_id, channel_url, token)).then(() => dispatch({type: "FINISHED_INITIAL_LOADING"}))
        dispatch(checkForConversation(channel_id, token))
        dispatch({type: "STORE_CHANNEL_INFO", channelId: channel_id, channelUrl: channel_url})
      }).catch(error => console.log(error))
    }).catch(error => console.log(error))
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
    const lastMessage = messages.messagesWhileInactive[messages.messagesWhileInactive.length - 1]
    return (
      <div>
        {(environment.inactive && messages.messagesWhileInactive.length > 0) &&
        <div className="messages-while-inactive">
          <div>
            {lastMessage.text.length > 121 ? `${lastMessage.text.slice(0, 121).trim()}...` : `Last Message: ${lastMessage.text}`}
          </div>
        </div>
        }
        <div className="chat-widget-button" style={{backgroundColor: widget.initialConfig.keyColor,
          backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: messages.messagesWhileInactive.length > 3 ? `url(${lastMessage.sender_avatar})` : `url(${AvatarOne})`}}
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
  const { widget, environment, messages } = state
  return {
    widget,
    environment,
    messages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
