import React, { Component } from 'react';
import { Link } from 'react-router';
import {ChatWidget} from '../ChatWidget/index';
//let classnames = require('classnames');

/* component styles */
import { styles } from './styles.scss';

import avatarImg  from '../../images/user-icon-black.svg';

export class Labels extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            welcomeMessage: 'Hi there, thanks for checking out chat.center, if you have any questions we will be happy to help, just let us know!',
            autoAnswer: 'We normally answer within 60 minutes or less. Please leave your questions here and someone will be with you shortly.',
            emailPrompt: 'Let us notify you via email:',
            emailPlaceholder: 'Your email',
            inputMsgholder: 'Type your message here',
            sendBtnText: 'Send',
            botName: 'Alex (Bot)',
            ccBranding: false
        };
    }


    updateInputChange( key, e) {

        var stateObject = () => {
            var returnObj = {};
            returnObj[key] = e.target.value;
            return returnObj;
        };

        this.setState( stateObject() );   

    }

    toggleSwitchStatus( key ) {
        var stateObject = () => {
            var returnObj = {};
            returnObj[key] = !this.state[ key ]
            return returnObj;
        };
        this.setState( stateObject() );   
    }

    inputFileChange( ) {
        var self = this;
        var oFReader = new FileReader();
        oFReader.readAsDataURL(this.refs.botAvatar.files[0]);
        oFReader.onload = function (oFREvent) {
            self.refs.botAvatarPreview.src = oFREvent.target.result;
        };
    }

    openFileInput() {
        this.refs.botAvatar.click();
    }

    render(){
        return (
            <div className="widget-labels">
                <div className="widget-label-main-content">
                    <a href="#" className="widget-close">
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
                    <h3 className="widget-sub-title">
                        Labels & Localization
                    </h3> 
                    <p className="widget-description">
                        If you want to localize chat widget, simply edit app labels below
                    </p>
                    <div className="wc-primary-section">
                        <div className="labels-form">
                            <div className="input-wrapper">
                                <label className="input-label">
                                    Welcome message
                                </label>
                                <div className="input-field-wrapper">
                                    <textarea className="input-field" value={this.state.welcomeMessage}
                                    onChange={this.updateInputChange.bind(this,'welcomeMessage')}></textarea>
                                </div>
                            </div>
                            <div className="input-wrapper auto-answer-wrapper">
                                <label className="input-label">
                                    Initial auto-answer
                                </label>
                                <div className="input-field-wrapper">
                                    <textarea className="input-field" 
                                    value={this.state.autoAnswer}
                                    onChange={this.updateInputChange.bind(this,'autoAnswer')}
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
                                    value={this.state.emailPrompt}
                                    onChange={this.updateInputChange.bind(this,'emailPrompt')}
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
                                            value={this.state.emailPlaceholder}
                                            onChange={this.updateInputChange.bind(this,'emailPlaceholder')}
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
                                            value={this.state.inputMsgholder}
                                            onChange={this.updateInputChange.bind(this,'inputMsgholder')}
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
                                            value={this.state.sendBtnText}
                                            onChange={this.updateInputChange.bind(this,'sendBtnText')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-wrapper cc-branding-wrapper">
                                        <span className={'widget-switch '+ (this.state.ccBranding? 'switch-on' : '')}
                                        onClick={this.toggleSwitchStatus.bind(this, 'ccBranding')}
                                        >
                                            <span className="switch-point"></span>
                                        </span>
                                        <label className="input-label">
                                            Chat Center Branding
                                        </label>
                                        <p className="input-desc">
                                            Premium plan is needed  to remove
                                        </p>
                                    </div>
                                </div>
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
                                            value={this.state.botName}
                                            onChange={this.updateInputChange.bind(this,'botName')}
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
                                                src="/dist/images/msg-env.png" 
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
                   <ChatWidget />
                </div>
        
            </div>
        );
    }
}
