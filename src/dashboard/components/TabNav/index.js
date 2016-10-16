import React, { Component } from 'react';
import { Link } from 'react-router';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as tabNavActions from '../../actions/TabNav';


import classNames from 'classnames';

/* component styles */
import { styles } from './styles.scss';


export class TabNav extends Component {
    
    setWidgetMenuState( value ) {
        this.props.tabNavActions.setTabNavState( value );
    }

    constructor( props ) {
        super( props );
    }


    render() {
        
        return (
            <div className={classNames("tab-nav-wrapper", {
                'open-tab-menu': this.props.tabnav.menuState
            } )} >
                <div className="tab-nav-overlay"
                    onClick={this.setWidgetMenuState.bind(this, false)}></div>
                <span className="glyphicon glyphicon-menu-hamburger tab-nav-menu-hamburger"
                    onClick={this.setWidgetMenuState.bind(this, true)}
                    ></span>
                <div className="tab-nav" >
                    <ul className="nav-links">
                        {
                            this.props.links.map( ( item, index ) => {
                                return (<li key={index}>
                                    <Link activeClassName="active-link" 
                                        to={
                                            item.toLink
                                        }>
                                        {item.label}
                                    </Link>
                                </li> )
                            } )
                        }
                    </ul>

                    <div className="tab-nav-footer">
                        {this.props.tabFooter}
                    </div>
                </div>
            </div>
        );
    }
}



TabNav.propTypes = {
  
}

function mapStateToProps(state) {
  return {
    tabnav: state.tabnav
  }
}

function mapDispatchToProps(dispatch) {
  return {
    tabNavActions: bindActionCreators(tabNavActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabNav);