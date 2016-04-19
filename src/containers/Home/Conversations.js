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
  componentDidMount(){
    this.props.actions.getConversations();
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversations)
