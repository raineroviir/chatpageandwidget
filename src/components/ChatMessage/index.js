import React, { Component } from 'react';

/* component styles */
//import { styles } from './styles.scss';

export class ChatMessage extends Component {
  render() {
    return (
        <div className="chat-group mCustomScrollBar">
          <ul className="chat-flow col-md-12">
            { 
              this.props.messages.map(message => {
                let user = this.props.user.userinfo;
                if(user.id != message.user_id){
                  return(
                    <li className="col-md-12">
                      <img className="img-circle pull-left" src="dist/images/user.png" title="{message.user_id}" alt="{user_id.user_id}" />
                      <span className="bubble">
                        {message.text}
                      </span>
                    </li>
                  )                  
                }
                else {
                  return(
                    <li className="col-md-12">
                      <img className="img-circle pull-right" src={user.avatar_96} title={ user.first_name } alt={ user.first_name } />
                      <div className="bubble bubble--alt">
                        { message.text}
                      </div>
                    </li>
                  )            
                }
              })
            }
            </ul>
          </div>
    );
  }
}
