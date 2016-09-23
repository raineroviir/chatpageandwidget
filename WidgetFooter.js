import React from 'react'
import CreateMessage from './CreateMessage'

export default class ConversationsFooter extends React.Component {
  constructor() {
    super()
    this.state = {
      composing: true
    }
  }
  render() {
    if (!this.state.composing) {
      return (<div className="conversations-footer">
                <CreateMessage />
              </div>)
    }
    return (
      <div className="conversations-footer">
        Start another conversation
      </div>
    )
  }
}
