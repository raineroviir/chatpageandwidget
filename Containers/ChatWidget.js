import React from 'react'
import { connect } from 'react-redux'
import Messages from './Messages'
import ConversationsContainer from './ConversationsContainer'
import { getConversations, backToConversationSummaryView} from '../actions/conversations'
import Footer from './Footer'
import Header from './Header'
import {styles} from './styles.scss'

class ChatWidget extends React.Component {
  componentDidMount() {
    const { dispatch, token, channelid } = this.props
    dispatch(getConversations(channelid, token))
  }
  backToConversationSummaryView() {
    const { dispatch } = this.props
    dispatch(backToConversationSummaryView())
  }
  render() {
    return (
      <div className="chat-widget">
        <Header keyColor={this.props.keyColor} onClick={this.props.onClick} backToConversationSummaryView={this.backToConversationSummaryView.bind(this)}
        activeConversation={this.props.activeConversation} preparingToCreateConversation={this.props.preparingToCreateConversation} />
        <ConversationsContainer />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.guest.token,
    channelid: state.guest.channel.id,
    activeConversation: state.conversations.activeConversation,
    preparingToCreateConversation: state.conversations.preparingToCreateConversation,
    keyColor: state.widget.initialConfig.keyColor
  }
}

export default connect(mapStateToProps)(ChatWidget)
