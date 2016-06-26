import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
//let classnames = require('classnames');
import { connect } from 'react-redux';
import * as WidgetActions from '../../../actions/Widget';;
import { bindActionCreators } from 'redux';
/* component styles */
import { styles } from './styles.scss';

import proInvImg from '../../images/proinvitation.png';


export class Invitations extends Component {
    constructor( props ){
        super( props );
    }

    componentWillMount() {
        this.props.actions.updateWidgetKey({
            key: 'classId',
            value: 'invitation'
        })
        this.props.actions.updateWidgetKey({
            key: 'widgetMenuState',
            value: false
        });
    }

    toggleSwitchStatus( key ) {
        this.props.actions.updateKey( {
            key:key,
            value: !this.props.widgetConfig.proChatInvitation
        } );
    }
    primeConditionChange( key, e ) {
        let value = {
            ...this.props.widgetConfig.primeCondition,
            [key]: e.target.value
        }
        this.props.actions.updateKey( {
            key: 'primeCondition',
            value: value
        } );
    }
    removeCondition( index ) {
        let propsConds = this.props.widgetConfig.conditionList;
        let conditionList = [
            ...propsConds.slice(0,index),
            ...propsConds.slice( index + 1)
        ];
        //this.props.widgetConfig.conditionList.splice(index, 1);
        this.props.actions.updateKey( {
            key:'conditionList',
            value: conditionList
        } );
    }
    addCondition() {
        let conditionList = [...this.props.widgetConfig.conditionList, {}];
        //this.props.widgetConfig.conditionList.push({});
        this.props.actions.updateKey( {
            key:'conditionList',
            value: conditionList
        } );

    }
    updateInputChange( key, e ) {
        this.props.actions.updateKey( {
            key:key,
            value: e.target.value
        } );
    }
    
    conditionListChange( index, key, e ){
        let propsConds = this.props.widgetConfig.conditionList;
        let conditionList = [
            ...propsConds.slice(0,index),
            {
                ...propsConds[index],
                [key]: e.target.value
            },
            ...propsConds.slice( index+1 )
        ];

        //this.props.widgetConfig.conditionList[index][key] = e.target.value;    
        this.props.actions.updateKey( {
            key:'conditionList',
            value: conditionList
        } );
    }

    render(){
        let conditionRows = this.props.widgetConfig.conditionList.map( ( cond, index)=> {
            return (<div className="condition-row" key={index}>
                        <div className="condition-cell cell1">
                            <div className="cell-content">
                                <select value={cond.condition1}
                                onChange={this.conditionListChange.bind(this, index, 'condition1')}
                                >
                                    <option value="current_page_url">Current page URL</option>
                                    <option value="website_url">website URL</option>
                                </select>
                            </div>
                        </div>
                        <div className="condition-cell cell2">
                            <div className="cell-content">
                                <select value={cond.condition2}
                                onChange={this.conditionListChange.bind(this, index, 'condition2')}>
                                    <option value="contains">Contains</option>
                                    <option value="starts_with">Starts With</option>
                                    <option value="ends_with">Ends with</option>
                                </select>
                            </div>
                        </div>
                        <div className="condition-cell cell3">
                            <div className="cell-content">
                                <input type="text" value={cond.value} 
                                onChange={this.conditionListChange.bind(this, index, 'value')}
                                className="input-field"/>
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
                        <select className="select-condition-criteria" value={this.props.widgetConfig.conditionCriteria}
                        onChange={this.updateInputChange.bind(this,'conditionCriteria')}>
                            <option value="all">All</option>
                            <option value="atleast_one">Atleast one</option>
                        </select>
                        of the following conditions are met:
                    </div>
                    
                    <div className="condition-row primary-condition-row">
                        <div className="condition-cell cell1">
                            <div className="cell-content">
                                <select value={this.props.widgetConfig.primeCondition.condition1} 
                                onChange={this.primeConditionChange.bind(this, 'condition1')}>
                                    <option  value="time_on_current_page">Time on current page </option>
                                    <option value="time_on_website">Time on website </option>
                                </select>
                            </div>
                        </div>
                        <div className="condition-cell cell2">
                            <div className="cell-content">
                                <select value={this.props.widgetConfig.primeCondition.condition2}
                                onChange={this.primeConditionChange.bind(this,'condition2')}>
                                    <option value="more_then">More than</option>
                                    <option value="less_then">Less than</option>
                                    <option value="equals">Equals to</option>
                                </select>
                            </div>
                        </div>
                        <div className="condition-cell cell3">
                            <div className="cell-content">
                                <input type="text" 
                                value={this.props.widgetConfig.primeCondition.value} 
                                className="input-field seconds"
                                onChange={this.primeConditionChange.bind(this, 'value')}
                                />
                                seconds
                            </div>
                        </div>
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
    actions: bindActionCreators(WidgetActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Invitations)