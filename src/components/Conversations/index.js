import React, { Component } from 'react';
import moment from 'moment';
/* component styles */
import { styles } from './styles.scss';

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
    let getConvresations = () => {
      if(!this.props.conversations || !this.props.conversations.length){ 
        return( <div className="chats-contacts">
          <ul>
          </ul>
        </div>
        )
      }
      return (
        <div className="chats-contacts">
          <ul>
            { this.props.conversations.map(conversation => {
              let activeConversation = this.props.activeConversation,
              userName = (conversation.last_message) ? conversation.last_message.user_id : "User",
              avatarText = "U" + (userName + "").charAt(0),
              time = moment(conversation.updated_at),
              diff = moment().endOf("day").diff(moment(conversation.updated_at), "days", true),
              displayTime = (diff <= 1) ? time.format("LT") : (diff <= 2) ? "yesterday" : time.format("D MMM YYYY");
              return (
                <li key={conversation.id} 
                onClick={this.selectConversation.bind(this, conversation)} 
                className={ (activeConversation == conversation.id) ? "active" : ""}>
                  <a>
                    <img className="img-circle" 
                    src="dist/images/user.png" 
                    title={conversation.name} 
                    alt={conversation.name} />
                    <span className="avatar">{avatarText}</span>
                    
                    <p className="name">
                      User { (conversation.last_message) ? conversation.last_message.user_id : "User"}
                      <span className="time-wrapper">{displayTime}</span>
                    </p>
                    <p className="message">
                    { (conversation.last_message) ? conversation.last_message.text : ""}
                    </p>
                    </a>
                  </li>
              );
            })
            }
          </ul>
        </div>
      );
    }

    return (<div className="chats-contacts-wrapper mCustomScrollBar">
            {getConvresations()}
    </div>);
  }
}