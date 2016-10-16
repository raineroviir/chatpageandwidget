import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { render } from 'react-dom';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';

//import {Installation} from '../../components/Widget/Installation';
import * as UpgradeActions from '../../actions/Upgrade'

import { styles } from './styles.scss';

const metaData = {
  title: 'Upgrade | Chat Center',
  description: 'Widget Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class UpgradeVew extends Component {
  

  constructor( props ){
    super( props );
  }
  
  componentWillMount() {

  }
  

  render() {
    //let classId = this.props.upgrade ? this.props.upgrade.classId : '';
    return (
      <div>
        <DocumentMeta {...metaData} />
        <Navigation historyApi={this.props.historyApi} />
        <div className="master-page-content">
          <div className="upgrade-component">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

UpgradeVew.propTypes = {
  // todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    upgrade: state.upgrade,
    historyApi: state.historyApi
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UpgradeActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpgradeVew);