import React from 'react'
import CreateMessage from './CreateMessage'
import CreateConversation from '../Components/CreateConversation'
import { connect } from 'react-redux'
import { createConversation, prepareToCreateConversation } from '../actions/conversations'

class Footer extends React.Component {
  onPrepareToCreateConversation() {
    const { token, channelid, dispatch } = this.props
    console.log(channelid, token)
    dispatch(prepareToCreateConversation())
  }
  render() {
    if (this.props.activeConversation || this.props.conversations.conversations.length === 0 || this.props.preparingToCreateConversation) {
      return (<div className="conversations-footer">
                <CreateMessage />
              </div>)
    }
    return (
      <div className="conversations-footer">
        <CreateConversation onPrepareToCreateConversation={this.onPrepareToCreateConversation.bind(this)}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeConversation: state.conversations.activeConversation,
    token: state.guest.token,
    channelid: state.guest.channel.id,
    conversations: state.conversations,
    preparingToCreateConversation: state.conversations.preparingToCreateConversation
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
