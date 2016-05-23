import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as CCActions from '../../actions'
import DocumentMeta from 'react-document-meta';

import { styles } from './styles.scss';

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
      <div  className="create-ext-chat create-ext-chat-form">
        <a href="#" className="close-wrapper">
          <span className="glyphicon glyphicon-remove"></span>
        </a>
        <div className="section-content">
          <h1 className="section-title">Who can delete unwanted messages and block for bad behavior?</h1>
          <p className="title-desc">What kind of chat would you like to create?</p>
          <div className="chat-type-wrapper">
            <div className="master-tile">
              <a className="master-link" href="#/channel/create/individual-chat">
                <span className="icon-wapper">
                  <span className="glyphicon glyphicon-user"></span>
                </span>
                <span className="master-link-title">Individual Chat</span>
              </a>
              <p className="master-tile-desc">
                Chat with each customer individually. Good for sales and support etc.
              </p>
            </div>
            <div className="master-tile">
              <a className="master-link" href="#/channel/create/group-chat">
                <span className="icon-wapper"><span className="glyphicon glyphicon-qrcode"></span></span>
                <span className="master-link-title">Group Chat</span>
              </a>
              <p className="master-tile-desc">
                Anybody can join, everyone talks in the same chat.
              </p>
            </div>
          </div>
        </div>  
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
