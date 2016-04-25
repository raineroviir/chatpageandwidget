import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';

/* components */
import { ChatMessage } from 'components/ChatMessage';
export class Messages extends Component {
  render() {
    return (
      <ChatMessage messages={this.props.messages.messages} user={this.props.user} />
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
