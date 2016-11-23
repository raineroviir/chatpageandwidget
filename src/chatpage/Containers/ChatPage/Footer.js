import React from 'react'
import CreateMessage from '../../../common/Containers/Messaging/CreateMessage'
import { connect } from 'react-redux'
import { createConversation, prepareToCreateConversation } from '../../../common/actions/conversations'

class Footer extends React.Component {
  render() {
    const { chatpage } = this.props
    return (
      <footer style={this.props.style} className="footer" >
        <CreateMessage />
        <div className="footer-message">
          <span className="powered-by">
            {"Powered by "}
            <span style={{color: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}}>
              {"Chat Center"}
            </span>
          </span>
        </div>
      </footer>
    )
  }
}

function mapStateToProps(state) {
  const { chatpage } = state
  return {
    chatpage
  }
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
