import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class Header extends Component {
  backToConversationSummaryView() {
    this.props.backToConversationSummaryView()
  }
  render() {
    console.log(this.props.activeConversation)
    if (this.props.activeConversation || this.props.preparingToCreateConversation) {
      return (
        <div className="header">
          <Button onClick={this.backToConversationSummaryView.bind(this)}>
            Back
          </Button>
          The Header
        </div>
      )
    }
    return (
      <div className="header">
      The Header</div>
    )
  }
}
