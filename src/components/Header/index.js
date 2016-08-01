import React, { Component } from 'react';
import { Link } from 'react-router';
import { ChannelMenu } from './channel-menu';

/* component styles */
import { styles } from './styles.scss';

export class HeaderView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openFeature: false,
      showSettingsMenu: false,
      settingsMenuLeft: '0px'
    };
  }


  toggleFeturePanel( e ) {
    e.preventDefault();
    this.setState({
      openFeature: !this.state.openFeature
    });
  }

  toggleSettingsMenu( e ){
    e.preventDefault();
    let el = e.currentTarget;
    this.props.poptartActions.setPoptartComponent(
      <ChannelMenu channel = {this.props.channelInfo} 
      posX = {$(el).offset().left} 
      posY = {$(el).offset().top}
      poptartActions = {this.props.poptartActions}
      />
    )
  }

  render() {
    let user = this.props.user.userinfo,
      channel = this.props.channelInfo;

   
    return (

      <div className="header">
          <div className="goback-icon">
            <span className="glyphicon glyphicon-chevron-left"></span>
          </div>
          <div className= { this.state.openFeature ? "feature-panel open-feature" : "feature-panel"} >
            <a href="#" className="glyphicon glyphicon-menu-hamburger  feature-panel-menu" onClick={this.toggleFeturePanel.bind(this)}> </a>
            <ul className="feature-list">
              <li className="button-user-li">
                <a className="button-user">
                  <span className="count">4</span>
                </a>
              </li>
              <li>
                <a className="button-search"></a>
              </li>
              <li>
                <a className="button-new"></a>
              </li>
              <li>
                <a className="button-mention"></a>
              </li>
              <li>
                <a className="button-tag"></a>
              </li>
            </ul>
          </div>
          {
            channel&&channel.is_direct ? <div className="title-section">
              <h1 className="title">
                Direct Messages
              </h1>
              <div>
                <a href="javascript:;" className="new-message-btn">
                  <span className="glyphicon glyphicon-pencil"></span>
                  NEW MESSAGE
                </a>
              </div>
            </div>
          :
            <div className="title-section">

              <h1 className="title">
                { channel && channel.name}
                <a href="#" className="channel-setting-gear" onClick={this.toggleSettingsMenu.bind(this)}>
                  <span className="channel-setting" aria-hidden="true"></span>
                </a>
              </h1>
              <p className="channel-name-wrapper">
                <span className="channel-name">
                {
                  channel ? (channel.address.domain + "/" + channel.address.channel) : ""
                }
                </span>
                <span className="label label-default">SHARE</span>
                </p>
            </div>
          }         
      </div>
    );
  }
}