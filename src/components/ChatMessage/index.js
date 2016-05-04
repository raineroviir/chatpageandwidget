import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';
//
import { DefaultMessage } from './default-message';

export class ChatMessage extends Component {
  componentDidUpdate (){
    $('.mCustomScrollBar').removeAttr("style").mCustomScrollbar({ 
      theme:"dark-3"        
    });
  }
  getMessages( messages ) {
    if( messages && messages.length  ) {
      return  (<ul className="chat-flow col-md-12">
          { 
            messages.map(message => {
              let user = this.props.user.userinfo;
              if(user.id != message.user_id){
                return(
                  <li key={message.id} className="col-md-12">
                    <img className="img-circle pull-left" src="dist/images/user.png" title="{message.user_id}" alt="{user_id.user_id}" />
                    <span className="bubble">
                      {message.text}
                    </span>
                  </li>
                )                  
              }
              else {
                return(
                  <li key={message.id} className="col-md-12">
                    <img className="img-circle pull-right" src={user.avatar_96} title={ user.first_name } alt={ user.first_name } />
                    <div className="bubble bubble--alt">
                      { message.text}
                    </div>
                  </li>
                )            
              }
            })
          }
        </ul>);
    } else {
      return <DefaultMessage></DefaultMessage>;
    }
  }
  render() {
    return (

      <div className="chat-group mCustomScrollBar">
        {this.getMessages(this.props.messages)} 
       
      </div>
    );
  }
}
