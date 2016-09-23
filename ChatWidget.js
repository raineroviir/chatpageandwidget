import React from 'react'
import Messages from './Messages'
import ConversationsContainer from './ConversationsContainer'
import { getConversations } from './actions/channels'
import WidgetFooter from './WidgetFooter'
import { connect } from 'react-redux'

class ChatWidget extends React.Component {
  componentDidMount() {
    const { dispatch, token, channelid } = this.props
    dispatch(getConversations(channelid, token))
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
      <ConversationsContainer />
      <WidgetFooter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.guest.token,
    channelid: state.guest.channel.id
  }
}

export default connect(mapStateToProps)(ChatWidget)
