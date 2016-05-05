import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';

/* components */
import { ChatTextBox } from 'components/ChatTextBox';
export class CreateMessage extends Component {
  createMessage(message){
    this.props.actions.createMessage(message, this.props.conversationid);
  }
  render() {
    return (
      <ChatTextBox createMessage={this.createMessage.bind(this)} message={this.props.postSuccessFul} user={this.props.user} />
    );
  }
}

function mapStateToProps(state) {
  return {
    conversationid: state.messages.conversationid,
    postSuccessFul: state.createMessage.showSuccessMessage,
    user: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
