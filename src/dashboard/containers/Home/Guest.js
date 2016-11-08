import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';

/* components */
import GuestInfo from './GuestInfo';
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
        <GuestInfo />
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
