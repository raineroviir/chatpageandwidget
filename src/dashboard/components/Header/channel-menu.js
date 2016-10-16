import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './channel-menu.scss';

export class ChannelMenu extends Component {
  constructor(props) {
    super(props);
  }

  hideMenu() {
    this.props.poptartActions.hidePoptart();
  }

  render() {
    let channel = this.props.channel;
    return (
      <div className="channel-menu" style={
        {
          left: this.props.posX - 46,
          top: this.props.posY + 32
        }
    }>
        <span className="menu-traingle" style={
          {
            left: this.props.posX - 27
          }
        }></span>
        <ul>
          {
            channel&&channel.is_public ? (<li>
              <Link to="/widget/installation" onClick= { this.hideMenu.bind(this) }>Website widget setup</Link>
            </li>):
            ''
          }
          
          <li>
            <a>Click to Chat button setup</a>
          </li>
          <li>
            <a>Chat page setup</a>
          </li>
          <li className="separator">
            <Link to={channel ? '/channel/edit/' + channel.id : 'javascript:;'} onClick= { this.hideMenu.bind(this) }>Channel name and URL</Link>
          </li>
          <li>
            <a>Channel notification preferances</a>
          </li>
          <li>
            <Link to={channel ? '/channel/members/' + channel.id : 'javascript:;'} onClick= { this.hideMenu.bind(this) }>Channel members</Link>
          </li>
        </ul>
      </div>
    );
  }
}
