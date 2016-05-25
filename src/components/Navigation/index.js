import React, { Component } from 'react';
import { Link } from 'react-router';
let classnames = require('classnames');

/* component styles */
import { styles } from './styles.scss';

export class NavigationView extends Component {
  switchOrganization(org, orgs){
    this.props.switchOrganization(org, orgs);
  }
  addOrganization(orgs){
    this.props.addOrganization(orgs.find(item => item.active));
  }
  render() {
    return (
        <nav className="master-nav">
        <div className="available-wrapper">
          <span className="available-status busy"></span>
          <span className="available-status inactive"></span>
          <span className="available-status online"></span>
        </div>
        <div className="org-list-wrapper">
          {
            this.props.orgs.orgs.map(org => {
              let avatar = (org.user && org.user.avatar_96) ? org.user.avatar_96 : "dist/images/logo.png";
              if(org.active){
                return(
                  <ul className="org-list expanded" key={org.name}>  
                    <li className="logo">
                      <a className={classnames({ avatar: !org.user.avatar_96})}>
                        <img className={classnames({ hide: !org.user.avatar_96})} src={avatar} title="Chat Center" />
                        <span className={classnames({ hide: org.user.avatar_96})}>{ (org.user.first_name + "").charAt(0) || "CC"}</span>
                      </a>
                    </li>
                    <li className="active"><a className="nav-link" href="javascript:;"><span  className="home-icon" aria-hidden="true"></span></a></li>
                    <li><a className="nav-link" href="javascript:;"><span className="dashboard-icon"  aria-hidden="true"></span></a></li>
                    <li><a className="nav-link groups-link" href="javascript:;"><span className="groups-icon"  aria-hidden="true"></span></a></li>
                    <li><a className="nav-link" href="javascript:;"><span className="search-icon"  aria-hidden="true"></span></a></li>
                    <li><a className="nav-link" href="javascript:;"><span className="settings-icon"  aria-hidden="true"></span></a></li>
                  </ul>
                );
              }
              else{
                return(
                <ul className="org-list" key={org.name}>  
                  <li onClick={this.switchOrganization.bind(this, org)} className="logo">
                    <a className={classnames({ avatar: !org.user.avatar_96})}>
                      <img className={classnames({ hide: !org.user.avatar_96})} src={avatar} title="Chat Center" />
                      <span className={classnames({ hide: org.user.avatar_96})}>{ (org.name + "").charAt(0) || "CC"}</span>
                    </a>
                  </li>
                </ul>
              );
              }
            })
          }
        </div>
        <div className="add-org-btn-wrapper">
            <Link  onClick={this.addOrganization.bind(this, this.props.orgs.orgs)} to="/?add">
              <span className="glyphicon glyphicon-plus add-icon" aria-hidden="true"></span>
            </Link>
        </div>
      </nav>
    );
  }
}
