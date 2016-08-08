import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {ChatWidget} from '../ChatWidget/index';
//let classnames = require('classnames');
import { connect } from 'react-redux';
import * as WidgetActions from '../../../actions/Widget';;
import { bindActionCreators } from 'redux';
let classNames = require("classnames");
/* component styles */
import { styles } from './styles.scss';

import avatarImg  from '../../images/user-icon-black.svg';

export class Labels extends Component {
    constructor( props ) {
        super( props );
        let plan = this.props.userinfo.plan;
        this.state = {
            userPlan:  plan && plan.stripe_id || 'free'
        }
    }

    componentWillMount() {
        this.props.actions.updateWidgetKey({
            key: 'classId',
            value: 'labels'
        })
        this.props.actions.updateWidgetKey({
            key: 'widgetMenuState',
            value: false
        });
    }


    updateInputChange( key, parentKey,  e) {
        let newState = {
            [parentKey] : {
                ...this.props.widgetConfig[parentKey],
                [key]: e.target.value
            }
        };

        this.props.actions.updateWigetConfigState( newState );

        //this.setState( stateObject() );   

    }

    toggleSwitchStatus( key ) {
        /*var stateObject = () => {
            var returnObj = {};
            returnObj[key] = !this.state[ key ]
            return returnObj;
        };*/
        let userPlan = this.state.userPlan;
        if( key === 'ccBranding' && ( userPlan === 'plus' ||  userPlan === 'plus_yearly' || userPlan === 'free' ) ) {
            return;
        }

        this.props.actions.updateKey({
            key: key,
            value: !this.props.widgetConfig[ key ]
        })

        

        /*this.setState( stateObject() ); */  
    }

    inputFileChange( ) {
        var self = this;
        var oFReader = new FileReader();
        oFReader.readAsDataURL(this.refs.botAvatar.files[0]);
        oFReader.onload = (oFREvent) => {
            this.props.actions.updateWigetConfigState( {
                bot : {
                    ...this.props.widgetConfig.bot,
                    avatarUrl: oFREvent.target.result
                }
            } );
            //self.refs.botAvatarPreview.src = oFREvent.target.result;
        };
    }

    openFileInput() {
        this.refs.botAvatar.click();
    }

    render(){
        let userPlan = this.state.userPlan,  pageDesc;
        
        if( userPlan === 'free' ) {
            pageDesc = (<div className="page-desc free-user">
                        
                        <h3 className="widget-sub-title">
                            Available on Plus and Premium plans.
                        </h3> 
                        <div className="buttons-wrapper">
                            <Link className="cc-btn" to="/upgrade/plans">View plans and upgrade </Link>
                        </div>
                        
                    </div>);
        } else {
            pageDesc = (<div className="page-desc premium-user">
                        <h3 className="widget-sub-title">
                            Labels & Localization
                        </h3> 

                        <p className="widget-description">
                            If you want to localize chat widget, simply edit app labels below
                        </p>
                    </div>);
        }
        return (
            <div>
                <div className="widget-label-main-content">
                    {
                        pageDesc
                    }
                    
                    <div className="wc-primary-section">
                        <div className="primary-section" 
                        className={ (userPlan === 'free') ? 'mask-primary-section' : ''
                        }></div>
                        <div className="labels-form">
                            <div className="input-wrapper">
                                <label className="input-label">
                                    Welcome message
                                </label>
                                <div className="input-field-wrapper">
                                    <textarea className="input-field" value={this.props.widgetConfig.content.welcomeMessage}
                                    onChange={this.updateInputChange.bind(this,'welcomeMessage', 'content')}></textarea>
                                </div>
                            </div>
                            <div className="input-wrapper auto-answer-wrapper">
                                <label className="input-label">
                                    Initial auto-answer
                                </label>
                                <div className="input-field-wrapper">
                                    <textarea className="input-field" 
                                    value={this.props.widgetConfig.content.autoAnswer}
                                    onChange={this.updateInputChange.bind(this,'autoAnswer', 'content')}
                                    ></textarea>
                                </div>
                                <p className="input-desc">Initial answer is a great way to set expectations.</p>
                            </div>
                            <div className="input-wrapper">
                                <label className="input-label">
                                    Email prompt
                                </label>
                                <div className="input-field-wrapper">
                                    <input className="input-field"
                                    value={this.props.widgetConfig.content.emailPrompt}
                                    onChange={this.updateInputChange.bind(this,'emailPrompt', 'content')}
                                    />
                                </div>
                            </div>
                            
                            <div className="row ">
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                            Email placeholder
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field" 
                                            value={this.props.widgetConfig.content.emailPlaceholder}
                                            onChange={this.updateInputChange.bind(this,'emailPlaceholder', 'content')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                            Input string placeholder
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field"  
                                            value={this.props.widgetConfig.content.inputMsgholder}
                                            onChange={this.updateInputChange.bind(this,'inputMsgholder', 'content')}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                            Send button text
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field"  
                                            value={this.props.widgetConfig.content.sendBtnText}
                                            onChange={this.updateInputChange.bind(this,'sendBtnText', 'content')}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {
                                    !( userPlan === 'plus' || userPlan === 'plus_yearly' || userPlan === 'free' )    
                                    ?
                                    (
                                    <div className="input-wrapper cc-branding-wrapper">
                                        <span className={'widget-switch '+ (this.props.widgetConfig.ccBranding? 'switch-on' : '')}
                                        onClick={this.toggleSwitchStatus.bind(this, 'ccBranding')}
                                        >
                                            <span className="switch-point"></span>
                                        </span>
                                        <label className="input-label">
                                            Remove Chat Center Branding
                                        </label>
                                        <p className="input-desc">
                                            Premium plan is needed  to remove
                                        </p>
                                        <div>
                                            <Link to="/upgrade/plans" className="cc-btn">View plans</Link>
                                        </div>
                                    </div> )
                                    : 
                                    (
                                        <div className="input-wrapper cc-branding-wrapper active-remove-ccbrand">
                                            <div className={
                                                classNames({
                                                    'disable-remove-ccbrand': (userPlan === 'plus' || userPlan === 'plus_yearly')
                                                })
                                            } >
                                                <div className="layer"></div>
                                                <span className={'widget-switch '+ (this.props.widgetConfig.ccBranding? 'switch-on' : '')}
                                                onClick={this.toggleSwitchStatus.bind(this, 'ccBranding')}
                                                >
                                                    <span className="switch-point"></span>
                                                </span>
                                                <label className="input-label">
                                                    Remove Chat Center Branding
                                                </label>
                                                <p className="input-desc">
                                                    Premium plan is needed  to remove
                                                </p>
                                            </div>
                                            <div>
                                                <Link to="/upgrade/plans" className="cc-btn">View plans</Link>
                                            </div>
                                        </div> 
                                    )
                                }
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                            Bot name
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field"  
                                            value={this.props.widgetConfig.bot.name}
                                            onChange={this.updateInputChange.bind(this,'name', 'bot')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <div className="bot-avatar-wrapper">
                                            <input id="botAvatar" type="file"  accept="image/*" 
                                            ref="botAvatar"
                                            onChange={this.inputFileChange.bind(this)} 
                                            />
                                            <div className="bot-avatar-preview">
                                                <img ref="botAvatarPreview" 
                                                src={this.props.widgetConfig.bot.avatarUrl}
                                                />
                                            </div>
                                            <div className="cell">
                                                <label className="input-label">
                                                    Bot avatar
                                                </label>
                                                <button type="button" 
                                                onClick={this.openFileInput.bind(this)}
                                                >CHANGE</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div className="widget-label-chat-preview">
                   <ChatWidget channelInfo={this.props.channelInfo} widgetConfig={this.props.widgetConfig}/>
                </div>
        
            </div>
        );
    }
}

Labels.propTypes = {
  actions: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    userinfo: state.userinfo.userinfo,
    widgetConfig: state.widgetConfig,
    channelInfo: state.channels.channels.all.find(channel => channel.id == state.conversations.channelid)
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WidgetActions, dispatch)
    
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Labels)