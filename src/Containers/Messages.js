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
    this.state = {
      isInfiniteLoading: false,
      currentScrollHeight: null
    }
  }
  componentDidMount() {
    const { dispatch, token, activeConversation, serverMessages } = this.props
    let node = ReactDOM.findDOMNode(this)
    this.setState({
      currentScrollHeight: ReactDOM.findDOMNode(this).scrollHeight
    })
    // dispatch(referenceToConversationBody(node))
    node.scrollTop = node.scrollHeight
  }
  componentWillUpdate(nextProps) {
    let node = ReactDOM.findDOMNode(this)
    console.log(nextProps)
    if(nextProps.isInfiniteLoading) {


      node.scrollTop = 300
    }
  }
  componentDidUpdate(prevProps) {
    const { messages, guest, user, height, width, dispatch, userCreatedNewMessage} = this.props
    let node = ReactDOM.findDOMNode(this)
    // console.log(node.children[2].children[1].offsetParent)
    // console.log(node.children[2].children[1].offsetHeight)
    // console.log(node.children[2].children[1].scrollHeight)
    if (this.props.userCreatedNewMessage) {
      node.scrollTop = node.scrollHeight
      dispatch(scrollComplete())
    }
    // if((messages[messages.length - 1].user_id === guest.data.id || user.data.id) && !this.props.isInfiniteLoading) {
    //   console.log(this.props.isInfiniteLoading)
    //   console.log(messages[messages.length - 1].user_id,guest.data.id,user.data.id)
    //   node.scrollTop = node.scrollHeight
    //   return
    // }
    if(this.props.isInfiniteLoading) {
      // node.scrollTop = 300  //this number needs to be adjusted to reflect accurately the avg height of 10 new message elements, also based on container width and height
      node.scrollTop = 300
      dispatch(infiniteLoadingDone())
    }
  }
  loadMoreHistory () {
    const { dispatch, serverMessages, messages, conversationid, token, scrollIndex } = this.props
    let node = ReactDOM.findDOMNode(this)
    console.log(node.scrollTop)
    const nextIndex = scrollIndex - 10
    const more = serverMessages.slice(nextIndex, scrollIndex)
    dispatch(changeScrollIndex(nextIndex))
    if (more.length === 0) {
      return;
    } else {
    // this.setState({isInfiniteLoading: true})
    dispatch(infiniteLoading())
    return new Promise((resolve, reject) => {
      // dispatch(getConversationHistory(conversationid,token))
      // let node = ReactDOM.findDOMNode(this)
      // console.log(node.scrollTop)
      // node.scrollTop = 300
        // this.setState({
        //   isInfiniteLoading: false,
        //   // messages: more.concat(this.state.messages),
        // });
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
        {!this.props.isInfiniteLoading ? <div style={{alignText: "center"}}>Loading...</div>: null}
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
    scrollToBottom: state.environment.scrollToBottom,
    height: state.environment.height,
    width: state.environment.width,
    isInfiniteLoading: state.environment.isInfiniteLoading,
    userCreatedNewMessage: state.messages.userCreatedNewMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
