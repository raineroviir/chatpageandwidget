import React, { Component } from 'react';

/* component styles */
import { styles } from './styles.scss';
//
import { DefaultMessage } from './default-message';

export class ChatMessage extends Component {
  componentDidMount (){
      
    $('.mCustomScrollBar').removeAttr("style").mCustomScrollbar({ 
      theme:"dark-3"        
    });
  }
  getMessages( messages ) {
    if( messages && messages.length  ) {
      return  (<ul className="chat-messages">
          { 
            messages.map(message => {
              let user = this.props.user.userinfo;
              let avatarText = "U" + ((message.user_id) ? (message.user_id + "").charAt(0) : "");
              if(user.id != message.user_id){
                return(
                  <li key={message.id} className="received-message fade-in">
                    <div className="chat-message">
                      <img className="img-circle" 
                      src="dist/images/user.png" 
                      title="{message.user_id}" 
                      alt="{user_id.user_id}" />
                      <span className="avatar">{avatarText}</span>
                      <div className="message-bubble">
                        {message.text}
                      </div>
                    </div>
                  </li>
                )                  
              }
              else {
                return(
                  <li key={message.id} className="sent-message fade-in">
                    <div className="chat-message">
                      <img className="img-circle" 
                      src={user.avatar_96} 
                      title={ user.first_name } 
                      alt={ user.first_name } />
                      <span className="avatar">{avatarText}</span>
                      <div className="message-bubble">
                        { message.text}
                      </div>
                    </div>
                  </li>
                )            
              }
            })
          }
        </ul>);
    } else {

      return (<DefaultMessage user={this.props.user} />);
    }
  }
  render() {
    return (
      <div className="chat-messages-wrapper mCustomScrollBar">
        <div>
          {this.getMessages(this.props.messages)} 
        </div>
      </div>
    );
  }
}