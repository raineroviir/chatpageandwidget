import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

//let classnames = require('classnames');
import { connect } from 'react-redux';
import * as ChatPageActions from '../../../actions/ChatPage';
import * as upgradeActions from '../../../actions/Upgrade';
import { browserHistory } from 'react-router';
import * as tabNavActions from '../../../actions/TabNav';

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
        this.props.actions.updateChatPageKey({
            key: 'classId',
            value: 'labels'
        })
        this.props.tabNavActions.setTabNavState( false );
    }


    updateInputChange( key, parentKey,  e) {
        let newState = {
            [parentKey] : {
                ...this.props.chatPageConfig[parentKey],
                [key]: e.target.value
            }
        };

        this.props.actions.updateChatPageConfigState( newState );

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
            value: !this.props.chatPageConfig[ key ]
        })

        

        /*this.setState( stateObject() ); */  
    }

    navigateToUpgradePlans( e ) {
        e.preventDefault();
        this.props.upgradeActions.updateUpgradeSource({
            from: '/ChatPage/labels',
            label: 'ChatPage Labels & Localization'
        });
        browserHistory.push( "/upgrade/plans" );

        
    }

    inputFileChange( ) {
        var self = this;
        var oFReader = new FileReader();
        oFReader.readAsDataURL(this.refs.botAvatar.files[0]);
        oFReader.onload = (oFREvent) => {
            this.props.actions.updateChatPageConfigState( {
                bot : {
                    ...this.props.chatPageConfig.bot,
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
                            <a className="cc-btn" href="/upgrade/plans"
                            onClick={this.navigateToUpgradePlans.bind(this)}>View plans and upgrade </a>
                        </div>
                        
                    </div>);
        } else {
            pageDesc = (<div className="page-desc premium-user">
                        <h3 className="widget-sub-title">
                            Labels & Localization
                        </h3> 

                        
                    </div>);
        }
        return (
            <div>
                <div className="widget-label-main-content">
                    {
                        pageDesc
                    }
                    
                    <div className="chat-primary-section">
                        <div className="primary-section" 
                        className={ (userPlan === 'free') ? 'mask-primary-section' : ''
                        }></div>
                        <div className="labels-form">
                            <div className="input-wrapper">
                                <label className="input-label">
                                    Channel Description
                                </label>
                                <div className="input-field-wrapper">
                                    <textarea className="input-field" value={this.props.chatPageConfig.content.channelDescription}
                                    onChange={this.updateInputChange.bind(this,'channelDescription', 'content')}></textarea>
                                </div>
                            </div>
                            <div className="input-wrapper auto-answer-wrapper">
                                <label className="input-label">
                                    welcome message
                                </label>
                                <div className="input-field-wrapper">
                                    <textarea className="input-field" 
                                    value={this.props.chatPageConfig.content.welcomeMessage}
                                    onChange={this.updateInputChange.bind(this,'welcomeMessage', 'content')}
                                    ></textarea>
                                </div>
                               
                            </div>
                            
                            
                            <div className="row ">
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                           Input string placeholder
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field" 
                                            value={this.props.chatPageConfig.content.inputMsgholder}
                                            onChange={this.updateInputChange.bind(this,'inputMsgholder', 'content')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                            Send button text
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field"  
                                            value={this.props.chatPageConfig.content.sendBtnText}
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
                                        <span className={'widget-switch '+ (this.props.chatPageConfig.ccBranding? 'switch-on' : '')}
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
                                            <a href="/upgrade/plans"
                                            onClick={this.navigateToUpgradePlans.bind(this)} className="cc-btn">View plans</a>
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
                                                <span className={'widget-switch '+ (this.props.chatPageConfig.ccBranding? 'switch-on' : '')}
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
                                                <a href="/upgrade/plans"
                                                onClick={this.navigateToUpgradePlans.bind(this)} className="cc-btn">View plans</a>
                                            </div>
                                            
                                        </div> 
                                    )
                                }
                            </div>
                            <div className="widget-preview-label-wrapper">
                                                <span className="preview-label">Chat page preview</span>
                                                 <Link to="/ChatPage/appearance" className="edit-label-link">Edit Appearance</Link>
                                            </div>
                        
                        </div>
                    </div>
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
    chatPageConfig: state.chatPageConfig,
    channelInfo: state.channels.channels.all.find(channel => channel.id == state.conversations.channelid)
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatPageActions, dispatch),
    upgradeActions: bindActionCreators( upgradeActions, dispatch ),
    tabNavActions:  bindActionCreators( tabNavActions, dispatch )
    
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Labels)