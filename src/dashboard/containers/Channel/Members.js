import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as CCActions from '../../actions/CreateChannel';
import DocumentMeta from 'react-document-meta';
import Navigation from '../Home/Navigation';
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

  toggleFind(bool){
    this.props.actions.toggleFind(bool);
  }

  getDirectUser(user){
    this.props.actions.getDirectUser(user);
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
      this.props.actions.getChannelMembers(this.props.id);
      this.props.actions.fetchChannel(this.props.id);
    } else if(this.props.userInfo.team)  {
      this.props.actions.getTeamMembers(false);
    }
    let teamName = this.props.org ? this.props.org.name.split('/')[0] : '';
    let isTeam = (teamName == window.config.cc || teamName == '') ? false : true;
    if(!isTeam){
      this.props.actions.toggleFind(true);
    }
  }

  render() {
    let teamName = this.props.org ? this.props.org.name.split('/')[0] : '';
    let teamDesc = this.props.org && this.props.org.user && this.props.org.user.team ? this.props.org.user.team.description : '';
    let isTeam = (teamName == window.config.cc || teamName == '') ? false : true;
    return (
        <div>
          <DocumentMeta {...metaData} />
          <Navigation historyApi={this.props.historyApi} />
          <ChannelMembers
            id={this.props.id}
            validateEmail={this.validateEmail.bind(this)}
            updateMembers={this.updateMembers.bind(this)}
            deleteMembers={this.deleteMembers.bind(this)}
            isTeam={isTeam}
            teamDesc={teamDesc}
            toggleFind={this.toggleFind.bind(this)}
            getDirectUser={this.getDirectUser.bind(this)}
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
    userInfo: state.userinfo.userinfo,
    id: ownProps.params.id,
    org: state.orgs.orgs.find(org => org.active)
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
