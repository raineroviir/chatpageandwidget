import React, { Component } from 'react';
import { Link } from 'react-router';
//let classnames = require('classnames');

/* component styles */
import { styles } from './styles.scss';

import proInvImg from '../../images/proinvitation.png';


export class Invitations extends Component {
    constructor( props ){
        super( props );
        this.state = {
            proChatInvitation: false,
            conditionList :[{}]
        }
    }

    toggleSwitchStatus( key ) {
        var stateObject = () => {
            var returnObj = {};
            returnObj[key] = !this.state[ key ]
            return returnObj;
        };
        this.setState( stateObject() );   
    }
    removeCondition( index ) {
        this.state.conditionList.splice(index, 1);
        this.setState({
            conditionList: this.state.conditionList
        });
    }
    addCondition() {
        this.state.conditionList.push({});
        this.setState({
            conditionList: this.state.conditionList
        });
    }
    render(){
        let conditionRows = this.state.conditionList.map( ( cond, index)=> {
            return (<div className="condition-row" key={index}>
                
                    <div className="condition-cell cell1">
                        <select>
                            <option>Condition1</option>
                            <option>Condition2</option>
                            <option>Condition3</option>
                        </select>
                    </div>
                    <div className="condition-cell cell2">
                        <select>
                            <option>Contains1</option>
                            <option>Contains2</option>
                            <option>Contains3</option>
                        </select>
                    </div>
                    <div className="condition-cell cell3">
                        <input type="text" className="input-field"/>
                        <span onClick={
                            this.removeCondition.bind(this, index)
                        }
                        className="remove-condition">
                            x
                        </span>
                    </div>
                </div>)
        });
        
        return (
            <div className="widget-invitation">
                <a href="#/dashboard" className="widget-close">
                </a>
                <div className="email-camp-channel">
                    <span className="email-icon-wrapper">
                        <span className="msg-env"></span>
                    </span>
                    Email Campaign channel
                </div>
                <h1 className="widget-title">
                    Website widget setup
                </h1>
                <div className="proactive-invitation">
                    <span>
                        Proactive chat invitations
                    </span>
                    <span className={'widget-switch '+ (this.state.proChatInvitation? 'switch-on' : '')}
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
                        <select>
                            <option>All</option>
                        </select>
                        of the following conditions are met:
                    </div>
                    
                    <div className="condition-row">
                        <div className="condition-cell cell1">
                            <select>
                                <option>Time on current page </option>
                            </select>
                        </div>
                        <div className="condition-cell cell2">
                            <select>
                                <option>More than</option>
                            </select>
                        </div>
                        <div className="condition-cell cell3">
                            <input type="text" className="input-field seconds"/>
                            seconds
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
