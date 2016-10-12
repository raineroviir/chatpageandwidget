import React from 'react'
import CreateMessage from '../CreateMessage'
import CreateConversation from '../../Components/Conversations/CreateConversation'
import { connect } from 'react-redux'
import { createConversation, prepareToCreateConversation } from '../../actions/conversations'

class Footer extends React.Component {
  onPrepareToCreateConversation() {
    const { token, channelid, dispatch } = this.props
    dispatch(prepareToCreateConversation())
  }
  render() {
    return (
      <footer style={this.props.style} className="footer" >
        <CreateMessage />
        <div className="footer-message">
          <span className="powered-by">
            {"Powered by "}
            <span style={{color: this.props.keyColor}}>
              {"Chat Center"}
            </span>
          </span>
        </div>
      </footer>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeConversationId: state.conversations.activeConversationId,
    token: state.guest.token,
    channelid: state.channels.activeChannelId,
    conversations: state.conversations,
    preparingToCreateConversation: state.conversations.preparingToCreateConversation,
    keyColor: state.widget.initialConfig.keyColor
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
