import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as CCActions from '../../actions'
import DocumentMeta from 'react-document-meta';

/* components */
import { Register } from 'components/Register';

const metaData = {
  title: 'Register | Chat Center',
  description: 'Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class Registration extends Component {
  render() {
    const { actions } = this.props
    return (
      <div>
          <DocumentMeta {...metaData} />
          <Register actions={actions} />
      </div>
    );
  }
}

Registration.propTypes = {
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
)(Registration)
