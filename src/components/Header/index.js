import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class Header extends Component {
  render() {
    return (
      <header>
        <span className="glyphicon glyphicon-circle-arrow-left visible-xs visible-sm" aria-hidden="true"></span>
        <h1>Chat Center Support<a href="#"><span className="glyphicon glyphicon-cog channel-setting" aria-hidden="true"></span></a></h1>
        <span>team.chat.center/cc</span><span className="label label-default">SHARE</span><span className="glyphicon glyphicon-user visible-xs" aria-hidden="true"></span>
      </header>
    );
  }
}
