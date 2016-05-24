import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';
import * as CreateChannelActions from '../../actions/CreateChannel';

/* components */
import { ChannelList } from 'components/ChannelList';
export class Channels extends Component {
  selectChannel(channelid){
    this.props.actions.getConversations(channelid, this.props.channels.channels.all);
  }
  createChannel(type){
    let attr = {}
    let url = '';
    switch (type) {
      case 'private':
        attr.is_public=false;
        attr.is_direct=false;
        attr.is_group=false;
        url='#/channel/create';
        break;
      case 'public':
        attr.is_public=true;
        attr.is_direct=false;
        attr.is_group=false;
        url='#/channel/type';
        break;
      case 'group':
        attr.is_public=false;
        attr.is_direct=false;
        attr.is_group=true;
        url='#/channel/create';
        break;
      case 'chat':
        attr.is_public=false;
        attr.is_direct=false;
        attr.is_group=false;
        url='#/channel/type';
        break;
      default:
        attr.is_public=false;
        attr.is_direct=false;
        attr.is_group=false;
        url='#/channel/type';
        break;
    }
    this.props.createChannelActions.chatType(attr);
    window.location.hash = url;
  }
  render() {
    return (
        <ChannelList createChannel={this.createChannel.bind(this)} channels={this.props.channels.channels} user={this.props.user} selectChannel={this.selectChannel.bind(this)} activeChannel={this.props.activeChannel}/>
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
    actions: bindActionCreators(ChannelsActions, dispatch),
    createChannelActions: bindActionCreators(CreateChannelActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels)
