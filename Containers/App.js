import React from 'react'
import { Overlay, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import ChatWidget from './ChatWidget'
import { registerGuestInfo } from '../actions/user'
import { bindActionCreators } from 'redux'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    const data = {email: "placeholder"}
    dispatch(registerGuestInfo(data))
  }
  toggle() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <div style={{ height: 100, bottom: 5, right: 150, position: 'absolute' }}>
        <Button style={{marginTop: 5}} ref="target" onClick={this.toggle.bind(this)}>
          I am an Overlay target
        </Button>
        <Overlay
          animation={false}
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
          placement="top"
          target={() => ReactDOM.findDOMNode(this.refs.target)}
        >
          <ChatWidget style={this.props.style} dispatch={this.props.dispatch} />
        </Overlay>
      </div>
    );
  }
}

export default connect()(App)
