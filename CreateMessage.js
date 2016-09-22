import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MessagesActions from './actions/messages';

/* components */
import { ChatTextBox } from './components/ChatTextBox';
export class CreateMessage extends Component {
  createMessage(message){
    this.props.actions.createMessage(message, this.props.conversationid || this.props.convid, this.props.guestToken, this.props.channelid);
  }
  render() {
    console.log(this.props)
    return (
      <ChatTextBox createMessage={this.createMessage.bind(this)} message={this.props.postSuccessFul} user={this.props.user} isGuest={this.props.isGuest} />
    );
  }
}

function mapStateToProps(state) {
  return {
    conversationid: state.messages.conversationid,
    channelid: state.channels.widgetChannel,
    postSuccessFul: state.createMessage.showSuccessMessage,
    user: state.userinfo,
    isGuest: state.guest.guest,
    guestToken: state.guest.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MessagesActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessage)
