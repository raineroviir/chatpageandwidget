import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as ChannelsActions from '../../actions/Channels';
import { browserHistory } from 'react-router';

import { GuestInfoView } from '../../components/GuestInfoView';

export class GuestInfo extends Component {

  registerGuestInfo(data){

    //store the value in STORE by dispatching event in action
    this.props.actions.registerGuestInfo(data);
  }

  render() {
    //const { actions } = this.props
    return (
      <GuestInfoView guest={this.props.guest} handleBack={this.handleBack} registerGuestInfo={this.registerGuestInfo.bind(this)} />
    );
  }
}

function mapStateToProps(state) {
  return {
    guest: state.channels.channels.guest
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(GuestInfo)
