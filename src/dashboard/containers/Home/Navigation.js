import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Navigation';

/* components */
import { NavigationView } from '../../components/Navigation';
export class Navigation extends Component {
  switchOrganization(org, orgs){
    this.props.actions.switchOrganization(org, orgs, this.props.historyApi)
  }
  addOrganization(org){
    this.props.actions.addOrganization(org)
  }
  componentWillMount(){
    this.props.actions.populateUserInfo()
  }
  render() {
    return (
        <NavigationView orgs={this.props.orgs}
        userinfo = { this.props.userinfo }
        switchOrganization={this.switchOrganization.bind(this)}
        addOrganization={this.addOrganization.bind(this)} />
    );
  }
}

function mapStateToProps(state) {
  return {
    orgs: state.orgs,
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
