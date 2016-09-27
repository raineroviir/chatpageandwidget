import React, { Component } from 'react';
import { styles } from './default-message.scss';

export default class DefaultMessage extends Component {
  render() {
    const { user, guest, widgetConfig } = this.props
    const backgroundImageUrl = widgetConfig.channel ? widgetConfig.channel.avatarUrl : null
    const welcomeMessage = widgetConfig.content ? widgetConfig.content.welcomeMessage : "Widget configuration wasn't loaded properly."
    return (
        <div className="default-message">
            <div className="feature-link">
                <div>
                    <span className="left-arrow"></span>
                    <div className="logo-wrapper">
                        <div className="welcome-logo" style={{backgroundImage: `url(${backgroundImageUrl}) noRepeat`}}></div>
                    </div>
                </div>
            </div>
            <div className="welcome-section">
                <div className="logo-wrapper">
                    <div className="welcome-logo" style={{backgroundImage: `url(${backgroundImageUrl}) noRepeat`}}></div>
                </div>
                <div className="title-section">
                    <h3 className="welcome-title">
                    </h3>
                    <p className="title-desc"></p>
                </div>
                <div className="welcome-message">
                  {welcomeMessage}
                </div>
                <div className="link-section">
                    <a href="javascript:;">{widgetConfig.channelUrl}</a>
                </div>
            </div>
        </div>
    );
  }
}
