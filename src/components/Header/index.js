import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class Header extends Component {
  render() {
    return (
      <header>
        <section className="row">
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            <span className="glyphicon glyphicon-circle-arrow-left visible-xs visible-sm" aria-hidden="true"></span>
            <h1>Chat Center Support<a href="#"><span className="glyphicon glyphicon-cog channel-setting" aria-hidden="true"></span></a></h1>
            <span>team.chat.center/cc</span><span className="label label-default">SHARE</span><span className="glyphicon glyphicon-user visible-xs" aria-hidden="true"></span>
          </div>
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <ul className="horizontal-list pull-right">
              <li className="button-search"></li>
              <li className="button-new"></li>
              <li className="button-mention"></li>
              <li className="button-tag"></li>
            </ul>
          </div>
        </section>
        
      </header>
    );
  }
}
