import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setActiveConversation, createConversation, getConversations } from '../actions/conversations'
import { createMessage } from '../actions/messages'
/* components */
import { ChatTextBox } from '../Components/ChatTextBox';
class CreateMessage extends Component {
  createMessage(message) {
    const { dispatch, actions, activeConversation, token, channelid } = this.props
    if (!activeConversation) {
      return dispatch(createConversation(channelid, token)).then((conversation) => {
        return dispatch(createMessage(message, conversation.id, token, channelid))
      })
    } else {
      dispatch(createMessage(message, activeConversation, token, channelid))
    }
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
    channelid: state.guest.channel.id,
    activeConversation: state.conversations.activeConversation
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
