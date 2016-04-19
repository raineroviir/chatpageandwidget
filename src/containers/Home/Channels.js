import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';

/* components */
import { ChannelList } from 'components/ChannelList';
export class Channels extends Component {
  render() {
    return (
        <ChannelList channels={this.props.channels.channels} />
    );
  }
  componentDidMount(){
    this.props.actions.getChannels();
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels)
