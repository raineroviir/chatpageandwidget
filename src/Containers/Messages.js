import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

/* components */
import { ChatMessage } from '../Components/ChatMessage';
class Messages extends Component {
  render() {
    return (
      <ChatMessage widgetConfig={this.props.widgetConfig} messages={this.props.messages.messages} user={this.props.user} guest={this.props.guest} />
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.user,
    guest: state.guest,
    widgetConfig: state.widget.initialConfig
  }
}

export default connect(mapStateToProps)(Messages)
