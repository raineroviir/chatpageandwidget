import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as CCActions from '../../actions/CreateChannel';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';
import {ChannelMembers} from '../../components/Channel/Members';

const metaData = {
  title: 'Channel | Chat Center',
  description: 'Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class ChannelMembersContainer extends Component {

  // constructor(props) {
  //   super(props); 
  // }

  handleBack(){
    //console.log('Moving 1 step back'); 
    window.history.back();
  }

  updateMembers(members){
    this.props.actions.updateMembers(members);
  }

  validateEmail(email){
    var allowed=/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/; 
    return allowed.test(email);
  }

  handleNext(members){
    //store the value in STORE by dispatching event in action
    //this.props.actions.registerOrganisationName(RegisterOrganisationName);

    //navigate to next screen
   // window.location.hash = "#/signup/organization/domain";
    this.props.actions.createChannel(members);
  }

  render() {
    return (
        <div>
          <DocumentMeta {...metaData} />
          <Navigation historyApi={this.props.historyApi} />
          <ChannelMembers validateEmail={this.validateEmail.bind(this)} updateMembers={this.updateMembers.bind(this)} details={this.props.createChannel} handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} />
        </div>
    );
  }
}

ChannelMembersContainer.propTypes = {
  // todos: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired
  //dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    createChannel: state.createChannel.CreateChannel
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CCActions, dispatch),
    //handleBack:PropTypes.func.isRequired 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelMembersContainer)
