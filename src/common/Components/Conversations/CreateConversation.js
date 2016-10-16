import React, { Component } from 'react';

export default class CreateConversation extends Component {
  onPrepareToCreateConversation() {
    this.props.onPrepareToCreateConversation()
  }
  render() {
    return (
      <div onClick={this.onPrepareToCreateConversation.bind(this)} >Create New Conversation</div>
    )
  }
}
