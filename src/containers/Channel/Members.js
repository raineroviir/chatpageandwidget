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
    this.props.actions.clearErrorMessage();
    window.history.back();
  }

  updateMembers(members){
    this.props.actions.updateMembers(members);
  }

  updateAutoSuggest(members){
    this.props.actions.updateAutoSuggest(members);
  }

  deleteMembers(user_id){
    let yes = confirm("Are you sure, you want to remove the user?");
    if(yes)
    this.props.actions.deleteMembers(user_id);
  }

  validateEmail(email){
    var allowed=/^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$)/; 
    return allowed.test(email);
  }

  handleNext(){
    //store the value in STORE by dispatching event in action
    //this.props.actions.registerOrganisationName(RegisterOrganisationName);

    //navigate to next screen
   // window.location.hash = "#/signup/organization/domain";
   if(this.props.id){
      this.props.actions.createChannel(true);
    } else {
      this.props.actions.createChannel();
    }

  }

  fetchMembersList(){
    if(this.props.id){
      this.props.actions.getTeamMembers(true);
      this.props.actions.getChannelMembers();
      this.props.actions.fetchChannel(this.props.id);
    } else  {
      this.props.actions.getTeamMembers(false);
    }
  }

  render() {
    return (
        <div>
          <DocumentMeta {...metaData} />
          <Navigation historyApi={this.props.historyApi} />
          <ChannelMembers 
            id={this.props.id} 
            validateEmail={this.validateEmail.bind(this)} 
            updateMembers={this.updateMembers.bind(this)} 
            deleteMembers={this.deleteMembers.bind(this)}
            fetchMembersList={this.fetchMembersList.bind(this)}
            updateAutoSuggest={this.updateAutoSuggest.bind(this)}
            details={this.props.createChannel} 
            handleBack={this.handleBack.bind(this)} 
            handleNext={this.handleNext.bind(this)} />
        </div>
    );
  }
}

ChannelMembersContainer.propTypes = {
  // todos: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired
  //dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    createChannel: state.createChannel.CreateChannel,
    id: ownProps.params.id
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
