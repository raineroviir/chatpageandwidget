import React from 'react'
import { connect } from 'react-redux'
import Messages from '../../../common/Containers/Messaging/Messages'
import Footer from '../../../common/Containers/Messaging/Footer'
import Header from '../../../common/Containers/Messaging/Header'
import {styles} from './styles.scss'
import ReactDOM from 'react-dom'
import {ChannelRouter} from '../ChannelRouter'

class ChatPage extends React.Component {
  render() {
    const { height, isMobile, width } = this.props
    const computedStyle = isMobile ?
    {height: `${height}px`,width: `${width}px`} :
    {height: "100%", top: "0"}
    return (
      <div className="chat-page" style={computedStyle}>
        <Header />
        <ChannelRouter />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { environment } = state
  const { height, isMobile, width } = environment
  return {
    height, isMobile, width
  }
}

export default connect(mapStateToProps)(ChatPage)
