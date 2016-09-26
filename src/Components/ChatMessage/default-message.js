import React, { Component } from 'react';

import myAvatar from './files/avatar.png'
/* component styles */
import { styles } from './default-message.scss';

export class DefaultMessage extends Component {
  render() {
    let user = this.props.user.userinfo || "Guest", isGuest = this.props.isGuest;
    return (
        <div className="default-message">
            <div className="feature-link">
                <div>
                    <span className="left-arrow"></span>
                    <div className="logo-wrapper">
                        <div className="welcome-logo" style={{backgroundImage: `url(${this.props.widgetConfig.channel.avatarUrl}) noRepeat`}}></div>
                    </div>
                </div>
            </div>
            <div className="welcome-section">
                <div className="logo-wrapper">
                    <div className="welcome-logo" style={{backgroundImage: `url(${this.props.widgetConfig.channel.avatarUrl}) noRepeat`}}></div>
                </div>
                <div className="title-section">
                    <h3 className="welcome-title">
                    </h3>
                    <p className="title-desc"></p>
                </div>
                <div className="welcome-message">
                  {this.props.widgetConfig.content.welcomeMessage}
                </div>
                <div className="link-section">
                    <a href="javascript:;">Channel URL</a>
                </div>
            </div>
        </div>
    );
  }
}
