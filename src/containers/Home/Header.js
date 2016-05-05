import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';

/* components */
import { HeaderView } from 'components/Header';
export class Header extends Component {
  render() {
    return (
        <HeaderView user={this.props.user} />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
