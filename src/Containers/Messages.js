import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getConversationHistory, setactiveConversationId } from '../actions/conversations'
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
import {loadServerMsgs, scrollCompleteForUserMessage, botReplyForFirstMessage, scrollCompleteForMsgStream, setOldestVisibleMessageUnixTimestamp } from '../actions/messages'
import {loadBot} from '../actions/bot'
import {updateUser, submittedEmailToBot} from '../actions/user'
import {markConversationAsRead} from '../actions/conversations'
class Messages extends Component {
  constructor(props) {
    super(props)
    this.handleUserEmailFromBot = this.handleUserEmailFromBot.bind(this)
    this.renderWaypoint = this.renderWaypoint.bind(this)
    this.loadMoreHistory = this.loadMoreHistory.bind(this)
  }
  componentDidMount() {
    const { dispatch, userScrollPosition, isGroupChat, conversationid, guest, user, initialLoadComplete } = this.props
    const token = guest.token || user.token
    const node = ReactDOM.findDOMNode(this)
    if (!initialLoadComplete) {
      this.loadInitialHistory()
    } else {
      userScrollPosition ? node.scrollTop = userScrollPosition : this.scrollToBottom()
    }
    dispatch(markConversationAsRead(conversationid, token))
    if (!isGroupChat) {
      dispatch(loadBot())
    }
  }
  loadInitialHistory() {
    const { conversationid, guest, user, dispatch, serverMessages, scrollIndex, messages, oldestVisibleMessageUnixTimestamp} = this.props
    const { token } = guest || user
    dispatch(getConversationHistory(conversationid, token, oldestVisibleMessageUnixTimestamp)).then((json) => {
      if (json.messages.length > 0) {
        this.scrollToBottom()
        const oldestVisibleMessage = json.messages[json.messages.length - 1]
        dispatch(setOldestVisibleMessageUnixTimestamp(oldestVisibleMessage))
      }
      dispatch({type: "INITIAL_MSG_LOAD_COMPLETE"})
    })
  }
  componentDidUpdate(prevProps) {
    const { dispatch, totalHeightOfHistoryMessages, isInfiniteLoading, userCreatedNewMessage, messages, botResponse, botActive, userScrollPosition, messageStreamNewMessage }  = this.props
    const node = ReactDOM.findDOMNode(this)
    if (userCreatedNewMessage) {
      this.scrollToBottom()
      dispatch(scrollCompleteForUserMessage())
    }
    if (messageStreamNewMessage) {
      this.scrollToBottom()
      dispatch(markConversationAsRead(conversationid, token))
      dispatch(scrollCompleteForMsgStream())
    }
    if (userCreatedNewMessage && !botResponse && botActive) {
      this.botResponse()
    }
  }
  botResponse() {
    const { dispatch, conversationid, channelid, guest, user, widgetConfig, emailReceived } = this.props
    const { token } = guest || user
    dispatch(botReplyForFirstMessage(conversationid, token, channelid, widgetConfig, emailReceived, guest))
  }
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }
  loadMoreHistory() {
    const { dispatch, serverMessages, messages, conversationid, scrollIndex, guest, user, nextFetchPage, reachedEnd, totalHeightOfHistoryMessages, oldestVisibleMessageUnixTimestamp } = this.props
    const { token } = guest || user
    const node = ReactDOM.findDOMNode(this)
    if (reachedEnd) {
      return
    }
    dispatch(infiniteLoading())
    dispatch(getConversationHistory(conversationid, token, oldestVisibleMessageUnixTimestamp)).then((json) => {
      if (json.messages.length === 0) {
        dispatch({type: "REACHED_CONVERSATION_HISTORY_END"})
        dispatch(infiniteLoadingDone())
        return
      }
      const oldestVisibleMessage = json.messages[json.messages.length - 1]
      node.scrollTop = totalHeightOfHistoryMessages
      dispatch(setOldestVisibleMessageUnixTimestamp(oldestVisibleMessage))
      dispatch(infiniteLoadingDone())
    })
  }
  renderWaypoint() {
    if (!this.props.isInfiniteLoading && this.props.initialLoadComplete) {
      return (
        <Waypoint
        bottomOffset="40px"
        onEnter={({previousPosition, currentPosition, event}) => {
          if (previousPosition === "above" && currentPosition === "inside") {
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
        <DefaultWidgetMessage widgetConfig={this.props.widgetConfig}/>
        {this.props.isInfiniteLoading && !this.props.reachedEnd ? <div style={{display: "flex", justifyContent: "center"}}>Loading History...</div>: null}
        <ChatMessages
        dispatch={this.props.dispatch} className="chat-messages-wrapper" messages={this.props.messages}  widgetConfig={this.props.widgetConfig}  user={this.props.user} guest={this.props.guest}
        isGroupChat={this.props.isGroupChat} messageStatus={this.props.messageStatus}
        handleUserEmailFromBot={this.handleUserEmailFromBot}
        emailReceived={this.props.emailReceived}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { channels, conversations, messages, guest, user, widget, environment } = state
  return {
    channelid: state.channels.activeChannelId,
    conversationid: state.conversations.activeConversationId,
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
    messageStreamNewMessage: state.messages.messageStreamNewMessage,
    nextFetchPage: state.messages.nextFetchPage,
    initialLoadComplete: state.messages.initialLoadComplete,
    reachedEnd: state.messages.reachedEnd,
    oldestVisibleMessageUnixTimestamp: state.messages.oldestVisibleMessageUnixTimestamp,
    emailReceived: state.bot.emailReceived
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
