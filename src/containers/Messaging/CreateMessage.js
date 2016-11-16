import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMessage } from '../../actions/messages'
/* components */
import { ChatTextBox } from '../../Components/ChatTextBox';
class CreateMessage extends Component {
  createMessage(message) {
    const { dispatch, activeConversationId, activeChannelId, guest, user} = this.props
    const userid =  user.data.id
    const sender_name = user.data.first_name || " "
    const token = user.token
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
      <ChatTextBox createMessage={this.createMessage.bind(this)} user={this.props.user} guest={this.props.guest} widget={this.props.widget} />
    );
  }
}

function mapStateToProps(state) {
  const { user, guest, channels, conversations, widget } = state
  const { activeChannelId } = channels
  const { activeConversationId } = conversations
  return {
    user,
    guest,
    widget,
    activeChannelId,
    activeConversationId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
