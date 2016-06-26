import React, { Component } from 'react';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as WidgetActions from '../../actions/Widget'


//let classnames = require('classnames');

/* component styles */
import { styles } from './styles.scss';


export class WidgetNav extends Component {
    setWidgetMenuState( value ) {
        this.props.actions.updateWidgetKey({
            key: 'widgetMenuState',
            value: value
        });
    }
    constructor( props ) {
        super( props );
        this.state = {
            menuState: false
        };
    }
    render() {
    //console.log( 'widgetnav', this.props.state );
    return (
        <div className="widget-nav-wrapper" >
            <div className="widget-nav-overlay"
                onClick={this.setWidgetMenuState.bind(this, false)}></div>
            <span 
                className="glyphicon glyphicon-menu-hamburger widget-nav-menu-hamburger"
                onClick={this.setWidgetMenuState.bind(this, true)}
                ></span>
            <div className="widget-nav" >
                
                
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
        </div>
    );
  }
}
