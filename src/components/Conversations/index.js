import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';

export class ConversationsView extends Component {
  componentDidUpdate (){
    $('.mCustomScrollBar').removeAttr("style").mCustomScrollbar({ 
      theme:"dark-3"        
    });
  }
  selectConversation(conversation){
    this.props.selectConversation(conversation.id)
  }
  render() {
    if(!this.props.conversations || !this.props.conversations.length){ 
      return(
      <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4 chat-contacts mCustomScrollBar hidden-xs">
        <ul className="nav nav-sidebar user-item">
        </ul>
      </div>
      )
    }
    return (
      <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4 chat-contacts mCustomScrollBar hidden-xs">
        <ul className="nav nav-sidebar user-item">
          { this.props.conversations.map(conversation => {
            let activeConversation = this.props.activeConversation;
            return (
              <li key={conversation.id} onClick={this.selectConversation.bind(this, conversation)} className={ (activeConversation == conversation.id) ? "active" : ""}><a><img className="img-circle" src="dist/images/user.png" title={conversation.name} alt={conversation.name} /><span className="user-presence online pull-right">8:36 PM</span><span className="name-and-message middle-content"><strong className="name"> User { (conversation.last_message) ? conversation.last_message.user_id : "User"}</strong><span className="message">{ (conversation.last_message) ? conversation.last_message.text : ""}</span></span></a></li>
            );
          })
          }
        </ul>
      </div>
    );
  }
}
