import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';

/* components */
import { ConversationsView } from 'components/Conversations';
export class Conversations extends Component {
  render() {
    return (
      <ConversationsView conversations={this.props.conversations.conversations} />
    );
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    channelid: (state.channels.channels.otherChannels[0]) ? state.channels.channels.otherChannels[0].id : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations)
