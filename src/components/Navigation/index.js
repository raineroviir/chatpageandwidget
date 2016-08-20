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
              let orgName = (org.user.team && org.user.team.name) ? org.user.team.name : org.user.first_name;
              if(org.active){
                return(
                  <ul className="org-list expanded" key={org.name}>  
                    <li className="logo">
                      <a className={classnames({ avatar: !org.user.avatar_96})}>
                        <img className={classnames({ hide: !org.user.avatar_96})} src={org.user.avatar_96} title="Chat Center" />
                        <span className={classnames({ hide: org.user.avatar_96})}>{ (orgName + "").charAt(0) || "CC"}</span>
                      </a>
                    </li>
                    <li className="active"><a className="nav-link" href="javascript:;"><span  className="home-icon" aria-hidden="true"></span></a></li>
                    <li><a className="nav-link" href="javascript:;"><span className="dashboard-icon"  aria-hidden="true"></span></a></li>
                    <li className={classnames({ hide: org.user.team})}><a className="nav-link groups-link" href="javascript:;"><span className="groups-icon"  aria-hidden="true"></span></a></li>
                    <li className={classnames({ hide: !org.user.team})}><Link className="nav-link groups-link" to="/organization/invite"><span className="groups-icon"  aria-hidden="true"></span></Link></li>
                    <li><a className="nav-link" href="javascript:;"><span className="search-icon"  aria-hidden="true"></span></a></li>
                    <li><Link to="/widget1/installation" className="nav-link"><span className="settings-icon"  aria-hidden="true"></span></Link></li>
                  </ul>
                );
              }
              else{
                return(
                <ul className="org-list" key={org.name}>  
                  <li onClick={this.switchOrganization.bind(this, org)} className="logo">
                    <a className={classnames({ avatar: !org.user.avatar_96})}>
                      <img className={classnames({ hide: !org.user.avatar_96})} src={org.user.avatar_96} title="Chat Center" />
                      <span className={classnames({ hide: org.user.avatar_96})}>{ (orgName + "").charAt(0) || "CC"}</span>
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
              <span className="add-icon" aria-hidden="true"></span>
            </Link>
        </div>
      </nav>
    );
  }
}
