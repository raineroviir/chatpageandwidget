import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from '../../actions/Login';
import DocumentMeta from 'react-document-meta';
import { browserHistory } from 'react-router';
import { fetchUserInfo } from '../../actions/Navigation';

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
  componentWillMount(){
    this.props.actions.addOrg(!!this.props.location.search && this.props.location.search == "?add");
    if(typeof Storage === "undefined" || !localStorage.getItem("orgs") || !localStorage.getItem("token") || !!this.props.location.search){
      return;
    }
    try {
      let user = JSON.parse(localStorage.getItem("orgs")).find(org => org.token.access_token === JSON.parse(localStorage.getItem("token")).access_token )
      fetchUserInfo().then(response => {
        if(response && response.ok){
          browserHistory.push("/dashboard/" + user.name.split("/")[1])
        }
      })
    }
    catch(e){

    }
  }
  render() {
    return (
      <div>
          <DocumentMeta {...metaData} />
          <LoginComponent addOrg={this.props.addOrg} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginDetails: state.loginDetails,
    addOrg: state.orgs.addOrg
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
