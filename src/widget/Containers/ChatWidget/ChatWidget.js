import React from 'react'
import { connect } from 'react-redux'
import Messages from '../../../common/Containers/Messages'
import { getConversations, backToConversationSummaryView} from '../../../common/actions/conversations'
import Footer from './Footer'
import Header from './Header'
import {styles} from './styles.scss'
import ReactDOM from 'react-dom'
import { storeUserScrollPosition
} from '../../../common/actions/environment'

class ChatWidget extends React.Component {
  closingWidget() {
    const { dispatch } = this.props
    const node = ReactDOM.findDOMNode(this)
    const scrollPosition = node.children[1].scrollTop
    dispatch(storeUserScrollPosition(scrollPosition))
    this.props.onClose()
  }
  render() {
    const { height, isMobile, width } = this.props
    const computedStyle = isMobile ?
    {height: `${height}px`,width: `${width}px`} :
    {height: this.props.widgetHeight, top: "auto"}
    return (
      <div className="chat-widget" style={computedStyle}>
        <Header onClose={this.closingWidget.bind(this)} />
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
    activeConversationId: state.conversations.activeConversationId,
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
