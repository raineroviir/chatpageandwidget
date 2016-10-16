import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';
import { browserHistory } from 'react-router';

/* components */
import { ConversationsView } from 'components/Conversations';
export class Conversations extends Component {
  selectConversation(conversationid){
    this.props.actions.getConversationHistory (conversationid); 
    browserHistory.push("/dashboard/" + this.props.activeChannel.address.channel + "/" + conversationid) 
  }
  render() {
    return (
      <ConversationsView conversations={this.props.conversations.conversations} selectConversation={this.selectConversation.bind(this)} activeConversation={this.props.activeConversation} />
    );
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    channelid: (state.channels.channels.otherChannels[0]) ? state.channels.channels.otherChannels[0].id : null,
    activeConversation: state.messages.conversationid,
    activeChannel: state.channels.channels.all.find(a => a.id === state.conversations.channelid)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations)
