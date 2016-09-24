import React, { Component } from 'react';
import { Button } from 'react-bootstrap'

export default class CreateConversation extends Component {
  onPrepareToCreateConversation() {
    this.props.onPrepareToCreateConversation()
  }
  render() {
    return (
      <Button onClick={this.onPrepareToCreateConversation.bind(this)} >Create New Conversation</Button>
    )
  }
}
