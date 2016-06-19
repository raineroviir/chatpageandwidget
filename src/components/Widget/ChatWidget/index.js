import React, { Component } from 'react';
import { Link } from 'react-router';
//let classnames = require('classnames');

/* component styles */
import { styles } from './styles.scss';

import avatarImg  from '../../images/user-icon-black.svg';

export class ChatWidget extends Component {

    constructor(props){
        super( props );
        this.state = {};
    }
    componentDidUpdate (){
        $('.mCustomScrollBar').removeAttr("style").mCustomScrollbar({ 
            theme:"dark-3"        
        });
    }
    emailPromptSubmit(e) {
        e.preventDefault();
        if(!this.refs.emailPromptInput.value) {
            return;
        }
        console.log('emailPromptSubmit functionality');
    }

    postMessage( e ) {
        e.preventDefault();
        if(!this.refs.postMsgInput.value) {
            return;
        }
        
        console.log('postMessage functionality');
        this.refs.postMsgInput.value = '';
    }

    render(){
        return (
        <div className="chat-widget">
            <div className="chat-widget-header">
                <span className="angle-down-arrow">
                    
                </span>
                <a href="#">
                    Sign in to chat.center
                </a>
            </div>

            <div className="chat-widget-body mCustomScrollBar">
                <div className="chat-widget-body-content">
                    <div className="welcome-section">
                        <div className="chat-center-team">
                            <div className="chat-widget-group-tiles">
                                <div className="chat-widget-group-tile" style={{zIndex: 3}}>
                                    <img src={avatarImg} />
                                </div>
                                <div className="chat-widget-group-tile" style={{zIndex: 2}}>
                                    <img src={avatarImg} />
                                </div>
                                <div className="chat-widget-group-tile" style={{zIndex: 1}}>
                                    <img src={avatarImg} />
                                </div>
                            </div>
                        
                            <div className="chat-center-team-name">Chat Center Team</div>
                            <p className="chat-center-team-link">
                                <a href="https://team.chat.center/cc">
                                    https://team.chat.center/cc
                                </a>
                            </p>
                        </div>
                        <div className="chat-widget-welcome-msg">
                            Hi there, thanks for checking out chat.center, if you have any questions  we will be happy to help, just let us know
                        </div>
                    </div>
                    <div className="">
                        <ul className="chat-widget-messages">
                            <li className="chat-widget-message">
                                <div className={"chat-avatar " + ( this.state.src ? '' : 'default-icon')}>
                                    <img src={this.state.src ? this.state.src : avatarImg} /
                                    > 
                                </div>
                                <div className="chat-message-wrapper">
                                    <p className="message-by">You</p>
                                    <div className="chat-message">
                                        Is this working?
                                    </div>
                                </div>
                            </li>
                            <li className="chat-widget-message received">
                                <div className={"chat-avatar " + ( this.state.src ? '' : 'default-icon')}>
                                    <img src={this.state.src ? this.state.src : avatarImg} /
                                    > 
                                </div>
                                <div className="chat-message-wrapper">
                                    <p className="message-by">CC Bot</p>
                                    <div className="chat-message">
                                       We usually answer within  5 minutes during working  hours (PST).
                                    </div>
                                </div>
                            </li>
                            <li className="chat-widget-message received same-user">
                                <div className="chat-message-wrapper">
                                    <div className="chat-message">
                                        Let us notify you via email:
                                    </div>
                                </div>
                            </li>
                            <li className="chat-widget-message received same-user">
                                <div className="chat-message-wrapper">
                                    <div className="chat-message email-prompt-wrapper">
                                        <form className="email-prompt" onSubmit={this.emailPromptSubmit.bind(this)} >
                                            <input type="text" className="email-promt-input" ref="emailPromptInput" placeholder="Your email" />
                                            <button className="email-prompt-submit">
                                                <span className="success-tick"></span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </li>
                            <li className="chat-widget-message">
                                <div className={"chat-avatar " + ( this.state.src ? '' : 'default-icon')}>
                                    <img src={this.state.src ? this.state.src : avatarImg} /
                                    > 
                                </div>
                                <div className="chat-message-wrapper">
                                    <p className="message-by">You</p>
                                    <div className="chat-message">
                                        My package didn't arrive
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="chat-widget-footer">
                <form className="post-message-form" onSubmit={
                    this.postMessage.bind(this)
                }>
                    <div className="attach-button-wrapper cell">
                        <span className="attach-button"></span>
                    </div>
                    <div className="post-input-wrapper cell">
                        <input type="text" ref="postMsgInput" placeholder="Type message"/>
                    </div>
                    <div className="post-submit-wrapper cell">
                        <button>Send</button>
                    </div>
                </form>
                <div className="promo-section">
                    <span className="promo-logo"></span>Powered by <a href="http://chat.center">chat.center</a>
                </div>
            </div>
        </div>
        );
    }
}
