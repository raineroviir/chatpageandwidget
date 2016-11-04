import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'
import Waypoint from 'react-waypoint'
import _ from 'lodash'
import styles from './styles.scss';
import { getConversationHistory, setactiveConversationId } from '../../actions/conversations'
import {MessageListItem} from '../../Components/ChatMessages/MessageListItem'
import { referenceToConversationBody, infiniteLoading, infiniteLoadingDone, storeUserScrollPosition } from '../../actions/environment'
import {loadServerMsgs, scrollCompleteForUserMessage, botReplyForFirstMessage, scrollCompleteForMsgStream, setOldestVisibleMessageUnixTimestamp } from '../../actions/messages'
import { Conversations } from '../../Components/Conversations';
import DefaultMessage from '../../Components/DefaultMessage'
import {ChatMessages} from '../../Components/ChatMessages'
import {changeScrollIndex} from '../../actions/environment'
import {loadBot} from '../../actions/bot'
import {updateUser, submittedEmailToBot} from '../../actions/user'
import {markConversationAsRead} from '../../actions/conversations'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.handleUserEmailFromBot = this.handleUserEmailFromBot.bind(this)
    this.renderWaypoint = this.renderWaypoint.bind(this)
    this.loadMoreHistory = this.loadMoreHistory.bind(this)
  }
  componentDidMount() {
    const { dispatch, userScrollPosition, isGroupChat, activeConversationId, guest, user, initialLoadComplete, routeParams, widget } = this.props
    // if (routeParams) {
    //   dispatch({type: "SAVE_CONVOID_FROM_ROUTE_PARAMS", routeParams})
    // }
    const { token } = guest || user
    const node = ReactDOM.findDOMNode(this)
    if (!initialLoadComplete && activeConversationId) {
      this.loadInitialHistory()
    } else {
      userScrollPosition ? node.scrollTop = userScrollPosition : this.scrollToBottom()
    }
    if (!isGroupChat && widget) {
      dispatch(loadBot())
    }
    if (!widget) {
      node.addEventListener('scroll', this.handleScroll.bind(this))
    }
  }
  loadInitialHistory() {
    const { activeConversationId, guest, user, dispatch, serverMessages, scrollIndex, oldestVisibleMessageUnixTimestamp} = this.props
    const { token } = guest || user
    dispatch(getConversationHistory(activeConversationId, token, oldestVisibleMessageUnixTimestamp)).then((json) => {
      if (json && json.messages.length > 0) {
        this.scrollToBottom()
        const oldestVisibleMessage = json.messages[json.messages.length - 1]
        dispatch(markConversationAsRead(activeConversationId, token))
        dispatch(setOldestVisibleMessageUnixTimestamp(oldestVisibleMessage))
      }
      dispatch({type: "INITIAL_MSG_LOAD_COMPLETE"})
    })
  }
  componentDidUpdate(prevProps) {
    const { dispatch, totalHeightOfHistoryMessages, isInfiniteLoading, userCreatedNewMessage, bot, userScrollPosition, messageStreamNewMessage, activeConversationId, guest, user }  = this.props
    const { token } = guest || user
    const node = ReactDOM.findDOMNode(this)
    if (userCreatedNewMessage) {
      this.scrollToBottom()
      dispatch(scrollCompleteForUserMessage())
    }
    if (messageStreamNewMessage) {
      this.scrollToBottom()
      dispatch(markConversationAsRead(activeConversationId, token))
      dispatch(scrollCompleteForMsgStream())
    }
    if (userCreatedNewMessage && !bot.botResponse && bot.botActive) {
      this.botResponse()
    }
  }
  botResponse() {
    const { dispatch, activeConversationId, activeChannelId, guest, user, widget, emailReceived } = this.props
    const { token } = guest || user
    dispatch(botReplyForFirstMessage(activeConversationId, token, activeChannelId, widget.initialConfig, emailReceived, guest))
  }
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }
  loadMoreHistory() {
    const { dispatch, activeConversationId, scrollIndex, guest, user, nextFetchPage, reachedEnd, totalHeightOfHistoryMessages, oldestVisibleMessageUnixTimestamp } = this.props
    const { token } = guest || user
    const node = ReactDOM.findDOMNode(this)
    if (reachedEnd) {
      return
    }
    dispatch(infiniteLoading())
    dispatch(getConversationHistory(activeConversationId, token, oldestVisibleMessageUnixTimestamp)).then((json) => {
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
  handleScroll(e) {
    const { dispatch } = this.props
    const scrollPosition = e.srcElement.scrollTop
    dispatch(storeUserScrollPosition(scrollPosition))
  }
  componentWillUnmount() {
    const { widget } = this.props
    if (!widget) {
      const node = ReactDOM.findDOMNode(this)
      node.removeEventListener('scroll', this.handleScroll.bind(this))
    }
  }
  handleUserEmailFromBot(email) {
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
        <DefaultMessage widget={this.props.widget}/>
        {this.props.isInfiniteLoading && !this.props.reachedEnd ? <div style={{display: "flex", justifyContent: "center"}}>Loading History...</div>: null}
        <ChatMessages
        dispatch={this.props.dispatch} className="chat-messages-wrapper" messagesList={this.props.messagesList} widget={this.props.widget}  user={this.props.user} guest={this.props.guest}
        isGroupChat={this.props.isGroupChat} messageStatus={this.props.messageStatus}
        handleUserEmailFromBot={this.handleUserEmailFromBot}
        emailReceived={this.props.emailReceived}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { channels, conversations, messages, guest, user, widget, environment, bot } = state
  const { activeChannelId, isGroupChat } = channels
  const { messagesList, userCreatedNewMessage, messageStreamNewMessage, initialLoadComplete, reachedEnd, oldestVisibleMessageUnixTimestamp } = messages
  const { height, width, isInfiniteLoading, scrollToBottom, totalHeightOfHistoryMessages, userScrollPosition } = environment
  const { activeConversationId } = conversations
  return {
    activeChannelId, isGroupChat,
    activeConversationId,
    messagesList, userCreatedNewMessage, messageStreamNewMessage, initialLoadComplete, reachedEnd, oldestVisibleMessageUnixTimestamp,
    height, width, isInfiniteLoading, scrollToBottom, totalHeightOfHistoryMessages, userScrollPosition,
    bot,
    guest,
    user,
    widget
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
