import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';

/* components */
import { ChatMessage } from 'components/ChatMessage';
import CreateMessage from 'containers/Home/CreateMessage';
export class Messages extends Component {
  render() {
    return (
      <div className="guest-messaging-wrapper">
        <div className="header-section">
          <div className="login-link-wrapper">
            <a href="#">Login</a>
          </div>
          <h1>Chat Center</h1>
        </div>

        <ChatMessage messages={this.props.messages.messages} user={this.props.user} guest={this.props.guest} channelError={this.props.channelError} />
        <CreateMessage isGuest={this.props.isGuest} convid={this.props.convid} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    user: state.userinfo,
    isGuest: state.guest.guest,
    convid: state.guest.convid,
    guest: state.guest.user_id,
    channelError: state.messages.channelError
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
