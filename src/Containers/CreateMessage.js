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
      <ChatTextBox keyColor={this.props.keyColor} createMessage={this.createMessage.bind(this)} message={this.props.postSuccessFul} user={this.props.user} guest={this.props.guest} />
    );
  }
}

function mapStateToProps(state) {
  return {
    guestconversation: state.guest.conversations,
    channel: state.guest.widgetChannel,
    user: state.user,
    guest: state.guest,
    token: state.guest.token,
    channelid: state.guest.channel.id,
    activeConversation: state.conversations.activeConversation,
    keyColor: state.widget.initialConfig.keyColor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
