import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as CCActions from '../../actions'
import DocumentMeta from 'react-document-meta';

/* components */
//import { Register } from 'components/Register';

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

export class Channel extends Component {
  render() {
    //const { actions } = this.props
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 logo-centered">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="logo-wrapper">
                  <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                </div>
                <h1 className="title text-center">chat.center</h1>
                <div className="details text-center">Create a free chat.center for:</div>
                <div className="user-type org col-sm-12 text-center">
                <a href="#/signup/organization/name">
                  <img src="dist/images/org-icon.svg" title="Organization" />
                  <span className="user-type-content">
                    <strong>Organization</strong>
                    <span>Great for teams and collaboration</span>
                  </span>
                </a>
                </div>
                <div className="user-type ind col-sm-12 text-center">
                <a href="#/signup/individual">
                  <img src="dist/images/ind-icon.svg" title="Organization" />
                  <span className="user-type-content">
                    <strong>Individual</strong>
                    <span>If you want to keep it nice and simple </span>
                  </span>
                </a>
                </div>
                <div className="col-sm-12 text-center">
                  <div className="sign-in-wrapper">
                    <span>Have an account?</span>
                    <a href="#/login" title="Sign in" className="pull-right">Sign in.</a>
                  </div>
                </div>
            </form>
       </div> 
    );
  }
}

Channel.propTypes = {
  // todos: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired
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
  mapStateToProps,mapDispatchToProps
)(Channel)
