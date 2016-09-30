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

class Messages extends Component {
  constructor(props) {
    super(props)
    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this)
    this.state = {
      messages: this.buildElements(0, 20),
      isInifiniteLoading: false,
      containerHeight: 500
    }
  }
  componentDidMount() {
    const { dispatch, token, activeConversation } = this.props

    this.setState({
      containerHeight: ReactDOM.findDOMNode(this).scrollHeight
    })
  }
  buildElements(start, end) {
    return this.props.messages.slice(start, end)
  }
  handleInfiniteLoad() {
    console.log('loading more')
    this.setState({
      isInifiniteLoading: true
    })
    return new Promise((resolve, reject) => {
      const { dispatch } = this.props
      let messagesLength = this.state.messages.length
      let newMessages = this.buildElements(20, 20 + 10)
      this.setState({
        isInfiniteLoading: false,
        messages: this.state.messages.slice(10, 20).concat(newMessages)
        })
      resolve()
   })
  }
  render() {
    return (
      <ReactChatView className="conversation-body"
      isInfiniteLoading={this.state.isInfiniteLoading} onInfiniteLoad={this.handleInfiniteLoad}>
        <DefaultWidgetMessage widgetConfig={this.props.widgetConfig}/>
        <ChatMessages className="chat-messages-wrapper" messages={this.state.messages}  widgetConfig={this.props.widgetConfig}  user={this.props.user} guest={this.props.guest}/>
      </ReactChatView>
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
