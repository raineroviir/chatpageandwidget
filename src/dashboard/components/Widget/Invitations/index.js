import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
//let classnames = require('classnames');
import { connect } from 'react-redux';
import * as WidgetActions from '../../../actions/Widget';;
import { bindActionCreators } from 'redux';
/* component styles */
import { styles } from './styles.scss';

import proInvImg from '../../images/proinvitation.png';
import * as tabNavActions from '../../../actions/TabNav';


export class Invitations extends Component {
    constructor( props ){
        super( props );
    }

    componentWillMount() {
        this.props.actions.updateWidgetKey({
            key: 'classId',
            value: 'invitation'
        })
        this.props.tabNavActions.setTabNavState( false );
    }

    toggleSwitchStatus( key ) {
        this.props.actions.updateKey( {
            key:key,
            value: !this.props.widgetConfig.proChatInvitation
        } );
    }
    /*primeConditionChange( key, e ) {
        let value = {
            ...this.props.widgetConfig.primeCondition,
            [key]: e.target.value
        }
        this.props.actions.updateKey( {
            key: 'primeCondition',
            value: value
        } );
    }*/
    removeCondition( index ) {
        let propsConds = this.props.widgetConfig.renderRuleSet.rules;
        let rules = [
            ...propsConds.slice(0,index),
            ...propsConds.slice( index + 1)
        ];

        this.props.actions.updateKey( {
            key:'renderRuleSet',
            value: {
                ...this.props.widgetConfig.renderRuleSet,
                rules: rules
            }
        } );
    }
    addCondition() {
        let rules = [...this.props.widgetConfig.renderRuleSet.rules, {
            varaible: 'time_on_current_page',
            operator: 'more_than',
            value: ''
        }];
        
        this.props.actions.updateKey( {
            key:'renderRuleSet',
            value: {
                ...this.props.widgetConfig.renderRuleSet,
                rules: rules
            }
        } );

    }
    updateRuleExpChange( key, e ) {
        this.props.actions.updateKey( {
            key:'renderRuleSet',
            value : {
                ...this.props.widgetConfig.renderRuleSet,
                ruleExpression: e.target.value
            }
        } );
    }
    
    renderRuleSetChange( index, key, isNumber, e ){
        let propsConds = this.props.widgetConfig.renderRuleSet.rules;
        let value =  e.target.value;
        if( isNumber && value ) {
            value = +value;
        }
        let rules = [
            ...propsConds.slice(0,index),
            {
                ...propsConds[index],
                [key]: value
            },
            ...propsConds.slice( index+1 )
        ];

           
        this.props.actions.updateKey( {
            key:'renderRuleSet',
            value: {
                ...this.props.widgetConfig.renderRuleSet,
                rules: rules
            }
        } );
    }

    render(){
        let conditionRows
        if( this.props.widgetConfig.renderRuleSet && this.props.widgetConfig.renderRuleSet.rules ) {
            conditionRows = this.props.widgetConfig.renderRuleSet.rules.map( ( cond, index)=> {
            return (<div className={"condition-row " +
                    ( 
                     ( cond.variable == 'time_on_current_page' || cond.variable =='time_on_website')  ?
                     'seconds-input' : ''
                    ) 
                    } key={index} >
                        <div className="condition-cell cell1">
                            <div className="cell-content">
                                <select defaultValue={cond.variable}
                                onChange={this.renderRuleSetChange.bind(this, index, 'variable', false)}
                                >
                                    <option value="time_on_current_page">Time on current page </option>
                                    <option value="time_on_website">Time on website </option>
                                    <option value="current_page_url">Current page URL</option>
                                    <option value="website_url">website URL</option>
                                </select>
                            </div>
                        </div>
                        <div className="condition-cell cell2">
                            <div className="cell-content">
                                {
                                    ( cond.variable == 'time_on_current_page' || cond.variable =='time_on_website')
                                    ? 
                                    <select defaultValue={cond.operator}
                                        onChange={this.renderRuleSetChange.bind(this, index, 'operator', false)}>
                                        <option value="more_than">More than</option>
                                        <option value="less_than">Less than</option>
                                        <option value="equal">Equal to</option>
                                    </select> :
                                    <select defaultValue={cond.operator}
                                        onChange={this.renderRuleSetChange.bind(this, index, 'operator', false)}>
                                        <option value="contains">Contains</option>
                                        <option value="equal">Equal to</option>
                                        <option value="does_not_contain">Doesn't Contain</option>

                                    </select>

                                }
                                
                            </div>
                        </div>
                        <div className="condition-cell cell3">
                            <div className="cell-content">
                                {
                                    ( cond.variable == 'time_on_current_page' || cond.variable =='time_on_website')
                                    ? 
                                    <span>
                                    <input type="text" 
                                    value={cond.value} 
                                    className="input-field seconds"
                                    onChange={this.renderRuleSetChange.bind(this, index, 'value', true)}
                                    />
                                    seconds
                                    </span>
                                    :
                                    <input type="text" value={cond.value} 
                                    onChange={this.renderRuleSetChange.bind(this, index, 'value', false)}
                                    className="input-field"/>


                                }
                                
                                <span onClick={
                                    this.removeCondition.bind(this, index)
                                }
                                className="remove-condition">
                                    x
                                </span>
                            </div>
                        </div>
                    </div>)
    
                });
            }
        
        return (
            <div>
                <div className="proactive-invitation">
                    <span>
                        Proactive chat invitations
                    </span>
                    <span className={'widget-switch '+ (this.props.widgetConfig.proChatInvitation? 'switch-on' : '')}
                        onClick={this.toggleSwitchStatus.bind(this, 'proChatInvitation')}
                    >
                        <span className="switch-point"></span>
                    </span>
                </div> 
                <h3 className="widget-sub-title">
                    Your invitation
                </h3>             
                <div className="pro-inv-banner-wrapper">
                    <img src={proInvImg} />
                </div>
                <div className="conditions-form">
                    <div className="conditions-title">
                        Show Invitations if 
                        <select className="select-condition-criteria" value={this.props.widgetConfig.renderRuleSet.ruleExpression}
                        onChange={this.updateRuleExpChange.bind(this,'ruleExpression')}>
                            <option value="all">All</option>
                            <option value="any">Any</option>
                        </select>
                        of the following conditions are met:
                    </div>
                    {
                        conditionRows
                    }
                    <div>
                        <button className="cc-btn" onClick={this.addCondition.bind(this)}>ADD CONDITION</button>
                    </div>
                </div>
            </div>
        );
    }
}

Invitations.propTypes = {
  // todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    widgetConfig: state.widgetConfig,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WidgetActions, dispatch),
    tabNavActions:  bindActionCreators( tabNavActions, dispatch )
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Invitations)