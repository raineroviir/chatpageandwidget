import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { render } from 'react-dom';
import DocumentMeta from 'react-document-meta';
import Navigation from 'containers/Home/Navigation';
import {WidgetNav} from '../../components/WidgetNav/index';
import {Appearance} from '../../components/widget/Appearance';

import * as WidgetActions from '../../actions/Widget'

// import App from './components';
// 
const metaData = {
  title: 'Wiget | Chat Center',
  description: 'Widget Chat Center',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'chat,center',
    },
  },
};

export class WidgetAppearance extends Component {
  constructor( props ){
    super( props );
  }
  render() {
    const { actions } = this.props
    return (
      <div>
        <DocumentMeta {...metaData} />
        <Navigation historyApi={this.props.historyApi} />
        <div className="widget-component">
          <WidgetNav />
          <div className="widget-content">
           <Appearance />
          </div>
        </div>
      </div>
    );
  }
}

WidgetAppearance.propTypes = {
  // todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WidgetActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetAppearance);