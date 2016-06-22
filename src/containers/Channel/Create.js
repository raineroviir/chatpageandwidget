import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import * as CCActions from '../../actions/CreateChannel';
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

  handleBack(){
    this.props.actions.resetDetails();
    window.history.back();
  }

  handleNext(attr){
    if(this.props.id) {
      this.props.actions.updateChannelDetails(attr);
    }
    else {
      this.props.actions.chatDetails(attr);
    }
  }

  fetchChannel(){
    if(this.props.id)
    this.props.actions.fetchChannel(this.props.id);
    
  }

  render() {
    
    return (
            <div>
              <DocumentMeta {...metaData} />
              <Navigation historyApi={this.props.historyApi} />
              <ChannelCreate 
              id={this.props.id} 
              fetchChannel={this.fetchChannel.bind(this)} 
              details={this.props.createChannel} 
              handleBack={this.handleBack.bind(this)} 
              handleNext={this.handleNext.bind(this)} />
          </div>
    );
  }
}

ChannelCreateContainer.propTypes = {
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
)(ChannelCreateContainer)
