import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as CCActions from '../../actions/Channels';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';
import {ChannelCreate} from '../../components/Channel/Create';

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

export class ChannelCreateContainer extends Component {

  // constructor(props) {
  //   super(props); 
  // }

  handleBack(){
    //console.log('Moving 1 step back'); 
    window.location.hash = "#/channel/create";
  }

  handleNext(RegisterOrganisationName){
    //store the value in STORE by dispatching event in action
    //this.props.actions.registerOrganisationName(RegisterOrganisationName);

    //navigate to next screen
    window.location.hash = "#/channel/members/2";

  }

  render() {
    return (
            <div>
              <DocumentMeta {...metaData} />
              <Navigation historyApi={this.props.historyApi} />
              <ChannelCreate registrationDetails={this.props.registrationDetails} handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} />
          </div>
    );
  }
}

ChannelCreateContainer.propTypes = {
  // todos: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired
  //dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    registrationDetails: state.registrationDetails
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
)(ChannelCreateContainer)
