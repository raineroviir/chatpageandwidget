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
import {loadServerMsgs} from '../actions/messages'
import {referenceToConversationBody} from '../actions/environment'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.renderWaypoint = this.renderWaypoint.bind(this)
    this.loadMoreHistory = this.loadMoreHistory.bind(this)
    this.state = {
      messages: this.props.serverMessages.slice(-20),
      isInfiniteLoading: false,
      messageIndex: -20,
      currentScrollHeight: null
    }
  }
  componentDidMount() {
    const { dispatch, token, activeConversation, serverMessages } = this.props
    dispatch(loadServerMsgs(serverMessages.slice(-20)))
    let node = ReactDOM.findDOMNode(this)
    this.setState({
      currentScrollHeight: ReactDOM.findDOMNode(this).scrollHeight
    })
    // dispatch(referenceToConversationBody(node))
    node.scrollTop = node.scrollHeight
  }
  componentDidUpdate(prevProps) {
    const { messages, guest, user } = this.props
    let node = ReactDOM.findDOMNode(this)
    if(this.state.isInfiniteLoading) {
      node.scrollTop = 300  //this number needs to be adjusted to reflect accurately the avg height of 10 new message elements, also based on container width and height 
    }
    if(messages[messages.length - 1].user_id === guest.data.id || user.data.id) {
      node.scrollTop = node.scrollHeight
    }
  }
  loadMoreHistory () {
    const { dispatch, serverMessages, messages, conversationid, token } = this.props
    const nextIndex = this.state.messageIndex - 10
    const more = serverMessages.slice(nextIndex, this.state.messageIndex)
    if (more.length === 0) {
      return;
    }
    this.setState({isInfiniteLoading: true})
    return new Promise((resolve, reject) => {
      // dispatch(getConversationHistory(conversationid,token))
        this.setState({
          isInfiniteLoading: false,
          // messages: more.concat(this.state.messages),
          messageIndex: nextIndex
        });
        dispatch(loadServerMsgs(more))
        resolve();
      });
  }
  renderWaypoint() {
    if (!this.state.isInfiniteLoading) {
      return (
        <Waypoint
        bottomOffset="240px"
        onEnter={({previousPosition, currentPosition, event}) => {
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
    console.log(this.props.messages)
    return (
      <div className="conversation-body">
        {this.renderWaypoint()}
        {!this.state.isInfiniteLoading ? <div style={{alignText: "center"}}>Loading...</div>: null}
        {/* <DefaultWidgetMessage widgetConfig={this.props.widgetConfig}/> */}
        <ChatMessages className="chat-messages-wrapper" messages={this.props.messages}  widgetConfig={this.props.widgetConfig}  user={this.props.user} guest={this.props.guest}
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
    scrollToBottom: state.environment.scrollToBottom
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
