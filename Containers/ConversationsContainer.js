import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Messages from './Messages'
import { getConversationHistory, setActiveConversation } from '../actions/conversations'
import { Conversations } from '../Components/Conversations';
class ConversationsContainer extends Component {
  selectConversation(conversationid) {
    const { dispatch, token } = this.props
    dispatch(getConversationHistory(conversationid, token));
    dispatch(setActiveConversation(conversationid))
  }
  render() {
    const { activeConversation, conversations } = this.props
    if (activeConversation || (!activeConversation && conversations.conversations.length === 0) || this.props.preparingToCreateConversation) {
      return (
        <Messages />
      )
    }
    return (
      <Conversations conversations={this.props.conversations.conversations} selectConversation={this.selectConversation.bind(this)} activeConversation={this.props.activeConversation} />
    );
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    channelid: (state.channels.channels.otherChannels[0]) ? state.channels.channels.otherChannels[0].id : null,
    activeConversation: state.conversations.activeConversation,
    activeChannel: state.channels.channels.all.find(a => a.id === state.conversations.channelid),
    token: state.guest.token,
    preparingToCreateConversation: state.conversations.preparingToCreateConversation
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsContainer)
