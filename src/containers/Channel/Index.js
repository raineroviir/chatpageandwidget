import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as CCActions from '../../actions/CreateChannel'
import DocumentMeta from 'react-document-meta';

/* components */
import Navigation from 'containers/Home/Navigation';
import { Channel } from '../../components/Channel/Index';

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
    this.props.actions.chatType(attr);
    window.location.hash = url;
  }

  render() {
    const { actions } = this.props
    return (
      <div>

          <DocumentMeta {...metaData} />
          <Navigation historyApi={this.props.historyApi} />
          <Channel actions={actions} chatType={this.chatType.bind(this)}/>
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
    todos: state.todos
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
