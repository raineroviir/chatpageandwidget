import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as LoginActions from '../../actions/Login'
import DocumentMeta from 'react-document-meta';

/* components */
import LoginComponent from 'components/Login';

const metaData = {
  title: 'Login | Chat Center',
  description: 'Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class Login extends Component {
  render() {
    return (
      <div>
          <DocumentMeta {...metaData} />
          <LoginComponent />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginDetails: state.loginDetails
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LoginActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Login)