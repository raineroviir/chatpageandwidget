import React, { Component } from 'react';

/* component styles */
import { styles } from './default-message.scss';


export class DefaultMessage extends Component {
  render() {
    let user = this.props.user.userinfo, isGuest = this.props.isGuest;

    return (
        <div className="default-message">
            <div className="feature-link">
                <div>
                    <span className="left-arrow"></span>
                    <div className="logo-wrapper">
                        <div className="welcome-logo"></div>
                    </div>
                </div>
            </div>
            <div className="welcome-section">
                <div className="logo-wrapper">
                    <div className="welcome-logo"></div>
                </div>
                <div className="title-section">
                    <h3 className="welcome-title">{window.config.cc} {(isGuest) ? "" : user && user.first_name}</h3>
                    <p className="title-desc">{(isGuest) ? "" : (!user?"":(user.team) ? (user.team.name + "/" + user.team.description) : (window.config.cc + "/" + user.username)) }</p>
                </div>
                <div className="welcome-message">
                    We will be happy to show you around, and help you make sure you are using Chat center to its full potential. Any feedback is very welcome too.
                </div>
                <div className="link-section">
                    <a href="javascript:;">{window.config.cc}</a>
                </div>
            </div>
        </div>
    );
  }
}
