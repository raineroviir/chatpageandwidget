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

class Messages extends Component {
  constructor(props) {
    super(props)
    this.renderWaypoint = this.renderWaypoint.bind(this)
    this.loadMoreHistory = this.loadMoreHistory.bind(this)
    this.state = {
      messages: this.props.messages.slice(-20),
      isInfiniteLoading: false,
      messageIndex: -20,
    }
  }
  componentDidMount() {
    const { dispatch, token, activeConversation } = this.props
    var node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }
  componentDidUpdate() {
    var node = ReactDOM.findDOMNode(this)
    node.scrollTop = 300
  }
  loadMoreHistory () {
    const { dispatch, messages, conversationid, token } = this.props
    this.setState({isInfiniteLoading: true})
    return new Promise((resolve, reject) => {
      const nextIndex = this.state.messageIndex - 10
      let more = messages.slice(nextIndex, this.state.messageIndex)
      if (more.length === 0) {
        return;
      }
        this.setState({
          isInfiniteLoading: false,
          messages: more.concat(this.state.messages),
          messageIndex: nextIndex
        });
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
    return (
      <div className="conversation-body">
        {this.renderWaypoint()}
        {/* <DefaultWidgetMessage widgetConfig={this.props.widgetConfig}/> */}
        <ChatMessages className="chat-messages-wrapper" messages={this.state.messages}  widgetConfig={this.props.widgetConfig}  user={this.props.user} guest={this.props.guest}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeConversation: state.conversations.activeConversation,
    activeChannel: state.channels.channels.all.find(a => a.id === state.conversations.channelid),
    messages: state.messages.messages,
    user: state.user,
    guest: state.guest,
    widgetConfig: state.widget.initialConfig,
    scrollIndex: state.environment.scrollIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
