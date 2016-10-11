import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getConversationHistory, setActiveConversation } from '../actions/conversations'
import { Conversations } from '../Components/Conversations';
import DefaultWidgetMessage from '../Components/DefaultMessage'
import {ChatMessages} from '../Components/ChatMessages'
import {changeScrollIndex} from '../actions/environment'
import ReactDOM from 'react-dom'
import ReactInfinite from 'react-infinite'
import {MessageListItem} from '../Components/ChatMessages/MessageListItem'
import Waypoint from 'react-waypoint'
import _ from 'lodash'
import { referenceToConversationBody, infiniteLoading, infiniteLoadingDone, storeUserScrollPosition } from '../actions/environment'
import {loadServerMsgs, scrollCompleteForUserMessage, botReplyForFirstMessage, scrollCompleteForMsgStream } from '../actions/messages'
import {loadBot} from '../actions/bot'
import {updateUser, submittedEmailToBot} from '../actions/user'
class Messages extends Component {
  constructor(props) {
    super(props)
    this.handleUserEmailFromBot = this.handleUserEmailFromBot.bind(this)
    this.renderWaypoint = this.renderWaypoint.bind(this)
    this.loadMoreHistory = this.loadMoreHistory.bind(this)
  }
  componentDidMount() {
    const { dispatch, userScrollPosition, isGroupChat } = this.props
    const node = ReactDOM.findDOMNode(this)
    if (this.props.messages.length === 0) {
      this.loadInitialHistory()
    } else {
      userScrollPosition ? node.scrollTop = userScrollPosition : this.scrollToBottom()
    }
    if (!isGroupChat) {
      dispatch(loadBot())
    }
    node.addEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this)
    node.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  handleScroll(e) {
    const { dispatch } = this.props
    const scrollPosition = e.srcElement.scrollTop
    dispatch(storeUserScrollPosition(scrollPosition))
  }
  loadInitialHistory() {
    const { conversationid, guest, user, dispatch, serverMessages, scrollIndex} = this.props
    const { token } = guest || user
    dispatch(getConversationHistory(conversationid, token)).then(json => {
      const { messages } = json
      if (messages) {
        const visibleMessages = messages.slice(scrollIndex, scrollIndex + 20)
        dispatch(changeScrollIndex(visibleMessages.length))
        dispatch(loadServerMsgs(visibleMessages))
        this.scrollToBottom()
      }
    })
  }
  componentDidUpdate(prevProps) {
    const { dispatch, totalHeightOfHistoryMessages, isInfiniteLoading, userCreatedNewMessage, messages, botResponse, botActive, userScrollPosition, messageStreamNewMessage }  = this.props
    const node = ReactDOM.findDOMNode(this)
    if (userCreatedNewMessage) {
      this.scrollToBottom()
      dispatch(scrollCompleteForUserMessage())
    }
    if (isInfiniteLoading) {
      node.scrollTop = totalHeightOfHistoryMessages
      dispatch(infiniteLoadingDone())
    }
    if (messageStreamNewMessage) {
      this.scrollToBottom()
      dispatch(scrollCompleteForMsgStream())
    }
    if (userCreatedNewMessage && !botResponse && botActive) {
      this.botResponse()
    }
  }
  botResponse() {
    const { dispatch, conversationid, channelid, guest, user, widgetConfig } = this.props
    const { token } = guest || user
    dispatch(botReplyForFirstMessage(conversationid, token, channelid, widgetConfig))
  }
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }
  loadMoreHistory() {
    const { dispatch, serverMessages, messages, conversationid, scrollIndex } = this.props
    const nextIndex = scrollIndex + 10
    const more = serverMessages.slice(scrollIndex, nextIndex)
    if (more.length === 0) {
      return
    } else {
      dispatch(changeScrollIndex(nextIndex))
      dispatch(infiniteLoading())
      return new Promise((resolve, reject) => {
      dispatch(loadServerMsgs(more))
      resolve()
      })
    }
  }
  renderWaypoint() {
    if (!this.props.isInfiniteLoading) {
      return (
        <Waypoint
        bottomOffset="40px"
        onEnter={({previousPosition, currentPosition, event}) => {
          if (currentPosition === "inside") {
            return this.loadMoreHistory()
          }
        }}
        onLeave={({previousPosition, currentPosition, event}) => {
        }}
        />
      )
    }
  }
  returnRandomAdjective() {
    let adjective = ["Bright","Dark","Amazing","Popular","Simple","Real","Hard","Easy","Young","Large"]
    return adjective[Math.floor((Math.random() * 10) + 1)]
  }
  returnRandomColor() {
    let color = ["Green","Red","Blue","Yellow","Purple","Orange","White","Black","Brown","Pink"]
    return color[Math.floor((Math.random() * 10) + 1)]
  }
  handleUserEmailFromBot(email) {
    console.log(email)
    const { dispatch, guest, user} = this.props
    const token = guest.token || user.token
    let firstName = guest.data.first_name || user.data.first_name
    if (!firstName) {
      firstName = this.returnRandomAdjective()
    }
    let lastName = guest.data.last_name || user.data.last_name
    if (!lastName) {
      lastName = this.returnRandomColor()
    }
    dispatch(updateUser({email: email, first_name: firstName, last_name: lastName}, token))
    dispatch(submittedEmailToBot(email))
  }
  render() {
    return (
      <div className="conversation-body">
        {this.renderWaypoint()}
        {this.props.isInfiniteLoading ? <div style={{alignText: "center"}}>Loading History...</div>: null}
        <DefaultWidgetMessage widgetConfig={this.props.widgetConfig}/>
        <ChatMessages
        dispatch={this.props.dispatch} className="chat-messages-wrapper" messages={this.props.messages}  widgetConfig={this.props.widgetConfig}  user={this.props.user} guest={this.props.guest}
        isGroupChat={this.props.isGroupChat} messageStatus={this.props.messageStatus}
        handleUserEmailFromBot={this.handleUserEmailFromBot}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { channels, conversations, messages, guest, user, widget, environment } = state
  return {
    channelid: state.channels.activeChannelId,
    conversationid: state.conversations.activeConversation,
    isGroupChat: state.channels.channels.isGroupChat,
    messages: state.messages.messages,
    serverMessages: state.messages.serverMessages,
    user: state.user,
    guest: state.guest,
    widgetConfig: state.widget.initialConfig,
    scrollIndex: state.environment.scrollIndex,
    scrollToBottom: state.environment.scrollToBottom,
    height: state.environment.height,
    width: state.environment.width,
    isInfiniteLoading: state.environment.isInfiniteLoading,
    userCreatedNewMessage: state.messages.userCreatedNewMessage,
    totalHeightOfHistoryMessages: state.environment.totalHeightOfHistoryMessages,
    userScrollPosition: state.environment.userScrollPosition,
    botResponse: state.bot.botResponse,
    botActive: state.bot.active,
    userScrollPosition: state.environment.userScrollPosition,
    messageStreamNewMessage: state.messages.messageStreamNewMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
