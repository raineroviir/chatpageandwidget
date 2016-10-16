import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';
import * as PoptartActions from '../../actions/Poptart'

/* components */
import { HeaderView } from 'components/Header';
export class Header extends Component {
  render() {
    return (
        <HeaderView 
        user={this.props.user} 
        channelInfo={this.props.channelInfo} 
        poptartActions = {this.props.poptartActions}
        />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userinfo,
    channelInfo: state.channels.channels.all.find(channel => channel.id == state.conversations.channelid)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch),
    poptartActions: bindActionCreators(PoptartActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
