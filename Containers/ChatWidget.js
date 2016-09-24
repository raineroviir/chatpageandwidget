import React from 'react'
import { connect } from 'react-redux'
import Messages from './Messages'
import ConversationsContainer from './ConversationsContainer'
import { getConversations, backToConversationSummaryView} from '../actions/conversations'
import Footer from './Footer'
import Header from './Header'

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
      <div
       style={{
         ...this.props.style,
         width: '15em',
         position: 'absolute',
         boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
         border: '1px solid #CCC',
         borderRadius: 3,
         marginLeft: -5,
         marginTop: 5,
         marginBottom: 5,
         padding: 8,
         height: '30em'
       }}
      >
      <Header backToConversationSummaryView={this.backToConversationSummaryView.bind(this)}
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
    preparingToCreateConversation: state.conversations.preparingToCreateConversation
  }
}

export default connect(mapStateToProps)(ChatWidget)
