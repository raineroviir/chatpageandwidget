import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setactiveConversationId, createConversation, getConversations } from '../actions/conversations'
import { createMessage } from '../actions/messages'
/* components */
import { ChatTextBox } from '../Components/ChatTextBox';
class CreateMessage extends Component {
  createMessage(message) {
    const { dispatch, actions, conversationid, token, channelid, guest, user} = this.props
    const userid = guest.data.id || user.data.id
    const sender_name = guest.data.first_name || user.data.first_name || " "

    let messageObject = {
      text: message,
      conversation_id: conversationid,
      user_id: userid,
      sender_name: sender_name,
      id: Math.random(Date.now()),
      status: `...`
    }
    dispatch(createMessage(messageObject, conversationid, token, channelid))
  }
  render() {
    return (
      <ChatTextBox keyColor={this.props.keyColor} createMessage={this.createMessage.bind(this)} message={this.props.postSuccessFul} user={this.props.user} guest={this.props.guest} widget={this.props.widget} />
    );
  }
}

function mapStateToProps(state) {
  return {
    channel: state.guest.widgetChannel,
    user: state.user,
    guest: state.guest,
    token: state.guest.token,
    channelid: state.channels.activeChannelId,
    conversationid: state.conversations.activeConversationId,
    keyColor: state.widget.initialConfig.keyColor,
    referenceToConversationBody: state.environment.referenceToConversationBody,
    widget: state.widget
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
