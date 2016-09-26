import React from 'react'
import { Overlay, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ChatWidget from './ChatWidget'
import { bindActionCreators } from 'redux'
import { styles } from './styles.scss'
import { registerGuestInfo, fetchUserInfo } from '../actions/user'
import { getWidget } from '../actions/widget'


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  componentDidMount() {
    const { dispatch, channel_id, channel_url } = this.props
    const data = {email: "placeholder"}
    dispatch(registerGuestInfo(data)).then((token) => dispatch(getWidget(channel_id, channel_url, token)))
    // dispatch(fetchUserInfo())
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
        {this.state.show && <ChatWidget onClick={this.onToggle.bind(this)} dispatch={this.props.dispatch} />}
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
