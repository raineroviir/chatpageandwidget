import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';

/* components */
import { ChannelList } from 'components/ChannelList';
export class Channels extends Component {
  selectChannel(channelid){
    this.props.actions.getConversations(channelid, this.props.channels.channels.all);
  }
  render() {
    return (
        <ChannelList channels={this.props.channels.channels} user={this.props.user} selectChannel={this.selectChannel.bind(this)} activeChannel={this.props.activeChannel}/>
    );
  }
  componentDidMount(){
    this.props.actions.getChannels();
  }
}

function mapStateToProps(state, ownProps) {
  return {
    channels: state.channels,
    user: state.userinfo,
    activeChannel: state.conversations.channelid
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels)
