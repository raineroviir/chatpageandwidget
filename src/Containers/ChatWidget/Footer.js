import React from 'react'
import CreateMessage from '../CreateMessage'
import CreateConversation from '../../Components/Conversations/CreateConversation'
import { connect } from 'react-redux'
import { createConversation, prepareToCreateConversation } from '../../actions/conversations'

class Footer extends React.Component {
  render() {
    return (
      <footer style={this.props.style} className="footer" >
        <CreateMessage />
        <div className="footer-message">
          {this.props.widget.initialConfig.ccBranding ? <span className="powered-by">
            {"Powered by "}
            <span style={{color: this.props.widget.initialConfig.keyColor}}>
              {"Chat Center"}
            </span>
          </span> : null}
        </div>
      </footer>
    )
  }
}

function mapStateToProps(state) {
  const { widget } = state
  return {
    widget
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
