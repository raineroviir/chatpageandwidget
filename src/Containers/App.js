import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ChatWidget from './ChatWidget'
import { bindActionCreators } from 'redux'
import { styles } from './styles.scss'
import { registerGuestInfo, fetchUserInfo } from '../actions/user'
import { getWidget } from '../actions/widget'
import { initEnvironment } from '../actions/environment'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  componentDidMount() {
    const { dispatch, channel_id, channel_url, height, width } = this.props
    const data = {email: "placeholder"}
    dispatch(initEnvironment())
    dispatch(registerGuestInfo(data)).then((token) => dispatch(getWidget(channel_id, channel_url, token)))
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
