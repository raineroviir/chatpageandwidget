import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ChatWidget from './ChatWidget/ChatWidget'
import { bindActionCreators } from 'redux'
import { styles } from './styles.scss'
import { initUser, fetchUserInfo } from '../actions/user'
import { getWidget } from '../actions/widget'
import { initEnvironment, storeUserScrollPosition
 } from '../actions/environment'
import { checkForConversation } from '../actions/conversations'
import { createWidgetChannel, fetchChannelInfo, fetchChannel} from '../actions/channels'
import {loadServerMsgs} from '../actions/messages'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  componentWillMount() {
    const { dispatch } = this.props
    dispatch({type: "BEGUN_INITIAL_LOADING"})
  }
  componentDidMount() {
    const { dispatch, channel_url, serverMessages } = this.props
    // setting some dummy data here for now while we get the actual data flow set up
    const data = {email: "placeholder"}
    console.log(channel_url)
    const index = channel_url.indexOf('/')
    const channelname = channel_url.slice(index + 1)
    const team = channel_url.slice(0,index)
    dispatch(initEnvironment())
    dispatch(initUser(data))
    .then((token) => {
      token = token.access_token
      dispatch(fetchChannel(channelname, team, token)).then((channel_id) => {
        dispatch(getWidget(channel_id, channel_url, token)).then(() => dispatch({type: "FINISHED_INITIAL_LOADING"}))
        dispatch(fetchChannelInfo(token, channel_id))
        dispatch(checkForConversation(channel_id, token))
        dispatch({type: "STORE_CHANNEL_INFO", channelId: channel_id, channelUrl: channel_url})
      })
    })
  }
  onToggle() {
    const { dispatch } = this.props
    this.setState({ show: !this.state.show });
  }
  render() {
    if (this.props.initialLoading) {
      return null
    }
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
    keyColor: state.widget.initialConfig.keyColor,
    serverMessages: state.messages.serverMessages,
    initialLoading: state.environment.initialLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
