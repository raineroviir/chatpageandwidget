import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ChatPage from './ChatPage/ChatPage'
import { bindActionCreators } from 'redux'
import { initUser, fetchUserInfo } from '../../common/actions/user'
import { initEnvironment
 } from '../../common/actions/environment'
import { checkForConversation, setactiveConversationId} from '../../common/actions/conversations'
import { fetchChannelInfo, fetchChannel, fetchSocket, fetchChannelMembers} from '../../common/actions/channels'
import {createMessage} from '../../common/actions/messages'
import saveSubDomainAsChannel from '../../common/actions/channels'
import {getChatPage} from '../actions/chatpage'

import moment from 'moment'

class App extends React.Component {
  constructor() {
    super()
  }
  getMessage(e) {
    this.onToggle()
    e.preventDefault();
    if(this.refs.Message.value == "") return;
    // this.createMessage(this.refs.Message.value);
    // doesn't work right now
    this.refs.Message.value = "";
  }
  createMessage(message) {
    const { dispatch, channels, conversations, guest, user } = this.props
    const conversationid = conversations.activeConversationId
    const channelid = channels.activeChannelId
    const token = guest.token || user.token
    dispatch(createMessage(message, conversationid, token, channelid))
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch({type: "BEGUN_INITIAL_LOADING"})
  }
  componentDidMount() {
    const { dispatch } = this.props
    // setting some dummy data here for now while we get the actual data flow set up
    // localStorage.clear()
    const data = {email: "placeholder"}
    const hostName = window.location.hostname
    const channelSubDomain = hostName.split('.')[0]
    let channelName = window.location.pathname.slice(1)
    if (channelName[channelName.length - 1] === '/') {
      channelName = channelName.slice(0, channelName.length - 1)
    }
    let channelHost = hostName.split('.')[1]
    if (channelHost = "localhost") {
      channelHost = "chat3.center"
    }
    const team = `${channelSubDomain}.${channelHost}`
    dispatch(initEnvironment())
    dispatch(initUser(data))
    .then((token) => {
      dispatch(fetchChannel(channelName, team, token)).then((channel) => {
        dispatch(fetchSocket(token, channel.id))
        dispatch(getChatPage(channel.id, token))
        if (!channel.is_group) {
          dispatch(checkForConversation(channel.id, token))
        }
        if (channel.conversation) {
          dispatch(setactiveConversationId(channel.conversation.id))
        }
        console.log(token, channel.id)
        dispatch(fetchChannelMembers(token, channel.id))
      }).catch(error => console.log(error))
    }).catch(error => console.log(error))
  }
  componentDidUpdate(prevProps) {
    const { dispatch } = this.props
    if (prevProps.environment.initialLoading === true && this.props.conversations.activeConversationId !== null && this.props.channels.activeChannelId !== null && this.props.chatpage.initialConfig.content) {
      dispatch({type: "FINISHED_INITIAL_LOADING"})
    }
  }
  render() {
    const { environment, messages, chatpage } = this.props
    if (environment.initialLoading) {
      return null
    }
    return (
      <div style={{display: "flex", justifyContent: "center"}}>
        <ChatPage />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { environment, messages, guest, user, channels, conversations, chatpage } = state
  return {
    chatpage,
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
