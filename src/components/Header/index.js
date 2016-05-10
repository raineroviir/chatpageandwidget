import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class HeaderView extends Component {
  render() {
    let user = this.props.user.userinfo;

    /*
    
    <span className="glyphicon glyphicon-circle-arrow-left arrow-left-icon" aria-hidden="true"></span> 

    <span className="glyphicon glyphicon-user visible-xs" aria-hidden="true">
              </span>
    */
    
    return (

      <div className="header">
          <div className="goback-icon">
            <span className="glyphicon glyphicon-circle-arrow-left "></span>
          </div>
          <div className="feature-panel">
            <ul className="feature-list">
              <li className="button-search"></li>
              <li className="button-new"></li>
              <li className="button-mention"></li>
              <li className="button-tag"></li>
            </ul>
          </div>
          <div className="title-section">

            <h1 className="title">
              Chat Center Support
              <a href="#">
              <span className="glyphicon glyphicon-cog channel-setting" aria-hidden="true"></span>
              </a>
            </h1>
            <p className="channel-name-wrapper">
              <span className="channel-name">
              {
                (user.team && user.team.name ) ? 
                (user.team.name + "/" + user.team.description) : 
                ("chat.center/" + (user.first_name?user.first_name:'')) 
              }
              </span>
              <span className="label label-default">SHARE</span>
              </p>
          </div>

         
      </div>
    );
  }
}