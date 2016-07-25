import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';
import * as CreateChannelActions from '../../actions/CreateChannel';
import { browserHistory } from 'react-router';
import { fetchSocket } from '../../actions/Channels';


/* components */
import { ChannelList } from 'components/ChannelList';

/*import io from 'socket.io-client';
const socket = io("ws://ec2-54-169-64-117.ap-southeast-1.compute.amazonaws.com:28080");
socket.on("connect", () => {
  socket.emit("message", JSON.stringify({
    command: "subscribe",
    identifier: { channel:"UserChannel", user_token:"3dec870e2c5b51a10cdf" }
  }));
})
socket.on('message', state => {
  console.log(state);
});*/


export class Channels extends Component {
  selectChannel(channel){
    this.props.actions.getConversations(channel.id, this.props.channels.channels.all);
    browserHistory.push("/dashboard/" + (channel.address.channel || ""))    
  }
  createChannel(type){
    let attr = {}
    let url = '';
    switch (type) {
      case 'private':
        attr.is_public=false;
        attr.is_direct=false;
        attr.is_group=false;
        //url='#/channel/create';
        url='/channel/create';
        break;
      case 'public':
        attr.is_public=true;
        attr.is_direct=false;
        attr.is_group=false;
        //url='#/channel/type';
        url='/channel/type';
        break;
      case 'group':
        attr.is_public=false;
        attr.is_direct=false;
        attr.is_group=true;
        //url='#/channel/create';
        url='/channel/create';
        break;
      case 'chat':
        attr.is_public=false;
        attr.is_direct=false;
        attr.is_group=false;
        //url='#/channel/type';
        url='/channel/type';
        break;
      default:
        attr.is_public=false;
        attr.is_direct=false;
        attr.is_group=false;
        //url='#/channel/type';
        url='/channel/type';
        break;
    }
    this.props.createChannelActions.chatType(attr);
    //window.location.hash = url;
    browserHistory.push(url);
  }
  render() {

    return (
        <ChannelList createChannel={this.createChannel.bind(this)} channels={this.props.channels.channels} user={this.props.user} selectChannel={this.selectChannel.bind(this)} activeChannel={this.props.activeChannel} org={this.props.org} />
    );
  }
  componentDidMount(){
    this.props.actions.getChannels();
    this.props.createChannelActions.resetDetails();
    this.props.actions.fetchSocket();
    if(this.props.channelname){
      this.props.actions.selectChannel(this.props.channelname, this.props.conversationname);
    }
  }
  componentDidUpdate(){
    //window.setTimeout(() => this.props.actions.testSocket(), 2000);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    channels: state.channels,
    user: state.userinfo,
    activeChannel: state.conversations.channelid,
    org: state.orgs.orgs.find(org => org.active)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch),
    createChannelActions: bindActionCreators(CreateChannelActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels)
