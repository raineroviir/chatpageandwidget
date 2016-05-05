import React, { Component } from 'react';
import { Link } from 'react-router';

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
        <nav className="navbar col-xs-2 hidden-xs col-md-3 leftmenu">
        <ul className="nav navbar-nav">
          <li className="available"><span className="user-presence offline"></span><span className="user-presence inactive"></span><span className="user-presence online"></span></li>
        </ul>
        {
          this.props.orgs.orgs.map(org => {
            let avatar = (org.user && org.user.avatar_96) ? org.user.avatar_96 : "dist/images/logo.png";
            if(org.active){
              return(
                <ul key={org.name} className="nav navbar-nav">  
                  <li className="logo"><a><img src={avatar} title="Chat Center" /></a></li>
                  <li className="active"><a href="#"><span className="glyphicon glyphicon-home" aria-hidden="true"></span></a></li>
                  <li><a href="javascript:;"><span className="glyphicon glyphicon-dashboard" aria-hidden="true"></span></a></li>
                  <li><a href="javascript:;"><span className="glyphicon glyphicon-user" aria-hidden="true"></span></a></li>
                  <li><a href="javascript:;"><span className="glyphicon glyphicon-search" aria-hidden="true"></span></a></li>
                  <li><a href="javascript:;"><span className="glyphicon glyphicon-cog" aria-hidden="true"></span></a></li>
                </ul>
              );
            }
            else{
              return(
              <ul key={org.name} className="nav navbar-nav">  
                <li onClick={this.switchOrganization.bind(this, org)} className="logo"><a><img src={avatar} title="Chat Center" /></a></li>
              </ul>
            );
            }
          })
        }
          <ul className="nav navbar-nav navbar-right fixed-btm-btn">
            <li><Link  onClick={this.addOrganization.bind(this, this.props.orgs.orgs)} to="/?add"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></Link></li>
          </ul>
        </nav>
    );
  }
}
