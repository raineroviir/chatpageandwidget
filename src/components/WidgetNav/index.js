import React, { Component } from 'react';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as WidgetActions from '../../actions/Widget'


//let classnames = require('classnames');

/* component styles */
import { styles } from './styles.scss';


export class WidgetNav extends Component {
  render() {
    console.log( 'widgetnav', this.props.state );
    return (
        <div className="widget-nav">
            <ul className="nav-links">
                <li>
                    <Link activeClassName="active-link" to="/widget/installation">Installation</Link>
                </li>
                <li>
                    <Link activeClassName="active-link" to="/widget/appearance">Appearance</Link>
                </li>
                <li>
                    <Link activeClassName="active-link" to="/widget/labels">Labels & Localization</Link>
                </li>
                <li>
                    <Link activeClassName="active-link" to="/widget/invitations">Proactive invitations</Link>
                </li>
            </ul>
            <div className="widget-nav-footer">
                Questions? <a href="#">Chat with us</a>
            </div>
        </div>
    );
  }
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
)(WidgetNav);