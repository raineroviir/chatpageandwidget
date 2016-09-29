import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ChatWidget from './ChatWidget/ChatWidget'
import { bindActionCreators } from 'redux'
import { styles } from './styles.scss'
import { initUser, fetchUserInfo } from '../actions/user'
import { getWidget } from '../actions/widget'
import { initEnvironment } from '../actions/environment'
import { getConversations, createConversation } from '../actions/conversations'
import { createWidgetChannel } from '../actions/channels'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  componentDidMount() {
    const { dispatch, channel_url, height, width } = this.props
    // setting some dummy data here for now while we get the actual data flow set up
    const data = {email: "placeholder"}
    const channel_id = 350;
    dispatch(initEnvironment())
    dispatch(initUser(data))
    .then((token) => {
      token = token.access_token
      dispatch(getWidget(channel_id, channel_url, token))
      dispatch(createWidgetChannel(token))
      // dispatch(createConversation(channel_id, token))

      // dispatch(getConversations(channel_id, token))
    })
    dispatch({type: "STORE_CHANNEL_INFO", channelId: channel_id, channelUrl: channel_url})
  }
  onToggle() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <div>
        <div className="chat-widget-button" style={{backgroundColor: this.props.keyColor}}
        onClick={this.onToggle.bind(this)}>
        </div>
        {this.state.show && <ChatWidget onClose={this.onToggle.bind(this)} dispatch={this.props.dispatch} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    keyColor: state.widget.initialConfig.keyColor
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
