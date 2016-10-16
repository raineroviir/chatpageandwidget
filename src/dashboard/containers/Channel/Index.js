import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as CCActions from '../../actions/CreateChannel'
import DocumentMeta from 'react-document-meta';

/* components */
import Navigation from '../Home/Navigation';
import { Channel } from '../../components/Channel/Index';
import { browserHistory } from 'react-router';

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

export class ChannelContainer extends Component {

  chatType(attr, url){
    attr.team = this.props.org ? this.props.org.name.split('/')[0] : ''
    this.props.actions.chatType(attr);
    //window.location.hash = url;
    browserHistory.push(url);
  }

  componentDidMount(){
    this.props.actions.resetDetails();
  }

  render() {
    let teamName = this.props.org ? this.props.org.name.split('/')[0] : '';
    let isTeam = (teamName == window.config.cc || teamName == '') ? false : true;
    const { actions } = this.props
    return (
      <div>

          <DocumentMeta {...metaData} />
          <Navigation historyApi={this.props.historyApi} />
          <Channel isTeam={isTeam} actions={actions} chatType={this.chatType.bind(this)}/>
      </div>
    );
  }
}


ChannelContainer.propTypes = {
  // todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    org: state.orgs.orgs.find(org => org.active)
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CCActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelContainer)
