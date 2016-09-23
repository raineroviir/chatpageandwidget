import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MessagesActions from './actions/messages';
import { createConversation, receiveConversationFromLocalStorage, getConversations } from './actions/channels'
/* components */
import { ChatTextBox } from './components/ChatTextBox';
class CreateMessage extends Component {
  createMessage(message) {
    this.props.actions.createMessage(message, this.props.guestconversation.id, this.props.token, this.props.channelid);
  }
  render() {
    return (
      <ChatTextBox createMessage={this.createMessage.bind(this)} message={this.props.postSuccessFul} user={this.props.user} isGuest={this.props.isGuest} />
    );
  }
}

function mapStateToProps(state) {
  return {
    guestconversation: state.guest.conversations,
    channel: state.guest.widgetChannel,
    postSuccessFul: state.createMessage.showSuccessMessage,
    user: state.userinfo,
    isGuest: state.guest.guest,
    token: state.guest.token,
    channelid: state.guest.channel.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MessagesActions, dispatch),
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
