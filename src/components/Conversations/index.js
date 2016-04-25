import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';

export class ConversationsView extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4 chat-contacts mCustomScrollBar hidden-xs">
        <ul className="nav nav-sidebar user-item">
          { this.props.conversations.map(conversation => {
            return (
              <li key={conversation.id}><a href="#"><img className="img-circle" src="dist/images/user.png" title={conversation.name} alt={conversation.name} /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message middle-content"><strong className="name">Sergey</strong><span className="message">{(conversation.last_message) ? conversation.last_message.text : ""}</span></span></a></li>
            );
          })
          }
        </ul>
      </div>
    );
  }
}
