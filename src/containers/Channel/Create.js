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
    window.history.back();
  }

  handleNext(attr){
    this.props.actions.chatDetails(attr);
    this.props.actions.createChannel();
  }

  render() {
    return (
            <div>
              <DocumentMeta {...metaData} />
              <Navigation historyApi={this.props.historyApi} />
              <ChannelCreate details={this.props.createChannel} handleBack={this.handleBack} handleNext={this.handleNext.bind(this)} />
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
)(ChannelCreateContainer)
