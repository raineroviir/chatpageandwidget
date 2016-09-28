import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Messages from './Messages'
import { getConversationHistory, setActiveConversation } from '../actions/conversations'
import { Conversations } from '../Components/Conversations';
import DefaultWidgetMessage from '../Components/DefaultMessage'

class ConversationsContainer extends Component {
  selectConversation(conversationid) {
    const { dispatch, token } = this.props
    dispatch(getConversationHistory(conversationid, token));
    dispatch(setActiveConversation(conversationid))
  }
  render() {
    return (
      <div className="conversation-body">
        <DefaultWidgetMessage widgetConfig={this.props.widgetConfig}/>
        <Messages />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    channelid: (state.channels.channels.otherChannels[0]) ? state.channels.channels.otherChannels[0].id : null,
    activeConversation: state.conversations.activeConversation,
    activeChannel: state.channels.channels.all.find(a => a.id === state.conversations.channelid),
    token: state.guest.token,
    preparingToCreateConversation: state.conversations.preparingToCreateConversation,
    widgetConfig: state.widget.initialConfig
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsContainer)
