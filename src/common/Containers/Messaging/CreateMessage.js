import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMessage } from '../../actions/messages'
/* components */
import { ChatTextBox } from '../../Components/ChatTextBox';
class CreateMessage extends Component {
  createMessage(message) {
    const { dispatch, activeConversationId, activeChannelId, guest, user} = this.props
    const userid = guest.data.id || user.data.id
    const sender_name = guest.data.first_name || user.data.first_name || " "
    const token = guest.token || user.token
    let messageObject = {
      text: message,
      conversation_id: activeConversationId,
      user_id: userid,
      sender_name: sender_name,
      id: Math.random(Date.now()),
      status: `...`
    }
    dispatch(createMessage(messageObject, activeConversationId, token, activeChannelId))
  }
  render() {
    return (
      <ChatTextBox createMessage={this.createMessage.bind(this)} user={this.props.user} guest={this.props.guest} widget={this.props.widget}
      chatpage={this.props.chatpage} />
    );
  }
}

function mapStateToProps(state) {
  const { user, guest, channels, conversations, widget,chatpage } = state
  const { activeChannelId } = channels
  const { activeConversationId } = conversations
  return {
    user,
    guest,
    widget,
    activeChannelId,
    activeConversationId,
    chatpage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
