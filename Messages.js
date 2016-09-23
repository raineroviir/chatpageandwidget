import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MessagesActions from './actions/messages';

/* components */
import { ChatMessage } from './components/ChatMessage';
class Messages extends Component {
  render() {
    return (
      <ChatMessage style={this.props.style} messages={this.props.messages.messages} user={this.props.user} guest={this.props.guest} />
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.userinfo,
    guest: state.guest.user_id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MessagesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
