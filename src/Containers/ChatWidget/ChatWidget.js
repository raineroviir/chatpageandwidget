import React from 'react'
import { connect } from 'react-redux'
import Messages from '../Messages'
import { getConversations, backToConversationSummaryView} from '../../actions/conversations'
import { toggleResize } from '../../actions/environment'
import Footer from './Footer'
import Header from './Header'
import {styles} from './styles.scss'

class ChatWidget extends React.Component {

  onToggleResize() {
    const { dispatch } = this.props
    dispatch(toggleResize())
  }
  render() {
    const { height, isMobile, width } = this.props
    const computedStyle = isMobile ?
    {height: `${height}px`,width: `${width}px`} :
    {height: this.props.widgetHeight, top: "auto"}
    return (
      <div className="chat-widget" style={computedStyle}>
        <Header onClose={this.props.onClose}
        onResize={this.onToggleResize.bind(this)} />
        <Messages />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.guest.token,
    channelid: state.channels.activeChannelId,
    activeConversation: state.conversations.activeConversation,
    preparingToCreateConversation: state.conversations.preparingToCreateConversation,
    keyColor: state.widget.initialConfig.keyColor,
    widget: state.widget,
    height: state.environment.height,
    width: state.environment.width,
    isMobile: state.environment.isMobile,
    widgetHeight: state.environment.widgetHeight,
    userScrollPosition: state.environment.userScrollPosition
  }
}

export default connect(mapStateToProps)(ChatWidget)
