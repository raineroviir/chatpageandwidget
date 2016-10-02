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
  // scrollToBottom = () => {
  //   let node = ReactDOM.findDOMNode(this)
  //   const scrollHeight = node.scrollHeight;
  //   const height = node.clientHeight;
  //   const maxScrollTop = scrollHeight - height;
  //   ReactDOM.findDOMNode(this).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  // }
  componentDidMount() {
    const { dispatch, token, activeConversation, serverMessages } = this.props
    let node = ReactDOM.findDOMNode(this)
    dispatch(loadServerMsgs(serverMessages.slice(-20)))
    this.setState({
      currentScrollHeight: ReactDOM.findDOMNode(this).scrollHeight
    })
    node.scrollTop = node.scrollHeight
  }
  componentDidUpdate(prevProps) {
    let node = ReactDOM.findDOMNode(this)
    console.log(this.state.isInfiniteLoading)
    if(this.state.isInfiniteLoading) {
      node.scrollTop = 300
    }
    if(!this.state.isInfiniteLoading) {
      node.scrollTop = node.scrollHeight
    }
    // if(prevProps.messages.length < this.props.messages.length) {
    //   node.scrollTop = node.scrollHeight
    // }
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
      //change this setup to dispatch to props.messages to keep one source of truth
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
        {/* <DefaultWidgetMessage widgetConfig={this.props.widgetConfig}/> */}
        <ChatMessages className="chat-messages-wrapper" messages={this.props.messages}  widgetConfig={this.props.widgetConfig}  user={this.props.user} guest={this.props.guest}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeConversation: state.conversations.activeConversation,
    activeChannel: state.channels.channels.all.find(a => a.id === state.conversations.channelid),
    messages: state.messages.messages,
    serverMessages: state.messages.serverMessages,
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
