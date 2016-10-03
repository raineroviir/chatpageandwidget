import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getConversationHistory, setActiveConversation } from '../actions/conversations'
import { Conversations } from '../Components/Conversations';
import DefaultWidgetMessage from '../Components/DefaultMessage'
import ReactChatView from 'react-chatview'
import {ChatMessages} from '../Components/ChatMessages'
import {changeScrollIndex} from '../actions/environment'
import ReactDOM from 'react-dom'
import ReactInfinite from 'react-infinite'
import {MessageListItem} from '../Components/ChatMessages/MessageListItem'
import Waypoint from 'react-waypoint'
import _ from 'lodash'
import { referenceToConversationBody, infiniteLoading, infiniteLoadingDone } from '../actions/environment'
import {loadServerMsgs, scrollComplete} from '../actions/messages'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.renderWaypoint = this.renderWaypoint.bind(this)
    this.loadMoreHistory = this.loadMoreHistory.bind(this)
  }
  componentDidMount() {
    if (this.props.messages.length === 0) {
      this.loadInitialHistory()
    } else {
      this.scrollToBottom()
    }
  }
  loadInitialHistory() {
    const { activeConversation, guest, user, dispatch, serverMessages, scrollIndex} = this.props
    const token = guest.token || user.token
    dispatch(getConversationHistory(activeConversation, token)).then(json => {
      const { messages } = json
      const visibleMessages = messages.slice(scrollIndex, scrollIndex + 20)
      console.log(visibleMessages)
      dispatch(changeScrollIndex(visibleMessages.length))
      dispatch(loadServerMsgs(visibleMessages))
      this.scrollToBottom()
    })
  }
  componentDidUpdate(prevProps) {
    const { dispatch, totalHeightOfHistoryMessages }  = this.props
    const node = ReactDOM.findDOMNode(this)
    if (this.props.userCreatedNewMessage) {
      this.scrollToBottom()
      dispatch(scrollComplete())
    }
    if(this.props.isInfiniteLoading) {
      node.scrollTop = totalHeightOfHistoryMessages
      dispatch(infiniteLoadingDone())
    }
  }
  scrollToBottom() {
    console.log('Action: SCROLLED TO BOTTOM')
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }
  loadMoreHistory () {
    const { dispatch, serverMessages, messages, conversationid, scrollIndex } = this.props
    const nextIndex = scrollIndex + 10
    const more = serverMessages.slice(scrollIndex + 1, nextIndex)
    console.log(more)
    if (more.length === 0) {
      return;
    } else {
      dispatch(changeScrollIndex(nextIndex))
      dispatch(infiniteLoading())
      return new Promise((resolve, reject) => {
      dispatch(loadServerMsgs(more))
      resolve();
      });
    }
  }
  renderWaypoint() {
    if (!this.props.isInfiniteLoading) {
      return (
        <Waypoint
        bottomOffset="40px"
        onEnter={({previousPosition, currentPosition, event}) => {
          console.log(previousPosition, currentPosition)
          if (event) {
            return this.loadMoreHistory()
          }
        }}
        onLeave={({previousPosition, currentPosition, event}) => {
        }}
        />
      )
    }
  }
  render() {
    return (
      <div className="conversation-body">
        {this.renderWaypoint()}
        {this.props.isInfiniteLoading ? <div style={{alignText: "center"}}>Loading...</div>: null}
        {/* <DefaultWidgetMessage widgetConfig={this.props.widgetConfig}/> */}
        <ChatMessages
        dispatch={this.props.dispatch} className="chat-messages-wrapper" messages={this.props.messages}  widgetConfig={this.props.widgetConfig}  user={this.props.user} guest={this.props.guest}
        currentChannelType={this.props.currentChannelType}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeConversation: state.conversations.activeConversation,
    currentChannelType: state.channels.isGroupChat,
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
    totalHeightOfHistoryMessages: state.environment.totalHeightOfHistoryMessages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
