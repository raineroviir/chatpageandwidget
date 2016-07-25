import React, { Component } from 'react';

/* component styles */
import moment from 'moment';
import { styles } from './styles.scss';
import { DefaultMessage } from './default-message';
let classNames = require("classnames");

export class ChatMessage extends Component {
  componentDidMount (){      
    $('.mCustomScrollBar').removeAttr("style").mCustomScrollbar({ 
      theme:"dark-3"        
    });
  }
  computeDate(date){
    if(!date) return false;
    let time = moment(date),
    diff = moment().endOf("day").diff(time, "days", true);
    return (diff <= 1) ? "today" : (diff <= 2) ? "yesterday" : time.format("D MMM YYYY")
  }
  componentDidUpdate(){
    $(".chat-messages-wrapper.mCustomScrollBar").mCustomScrollbar("update");
    $(".chat-messages-wrapper.mCustomScrollBar").mCustomScrollbar("scrollTo", "bottom");
  }
  getMessages( messages ) {
    if( messages && messages.length  ) {
      return  (<ul className="chat-messages">
          { 
            messages.map((message, ind, msgs) => {
              let user = this.props.user.userinfo,
                combineMessage = !!ind && msgs[ind - 1].user_id == message.user_id,
                displayDate = this.computeDate(message.created_at),
                avatarText = message.sender_name ? _.reduce(message.sender_name.split(" "), (res, a) => res + (a + "").charAt(0), "") : ("U" + ((message.user_id) ? (message.user_id + "").charAt(0) : "")),
                isShowDate = !!ind && this.computeDate(msgs[ind - 1].created_at) == displayDate,
                relative_time = displayDate == "today" && moment(message.created_at).format("LT");
              
              if(user.id != message.user_id){
                return(
                  <li key={message.id} className="received-message fade-in">
                    <div className={classNames("text-center", { hide: isShowDate })}>{ displayDate}</div>
                    <div className="chat-message">
                      <span className={classNames("avatar", { hide: !!message.sender_avatar })}>{avatarText}</span>
                      <img className={classNames("img-circle", { hide: !message.sender_avatar })} src={message.sender_avatar} title={message.sender_name} alt={message.sender_name} />
                      <div className={classNames("user-name-display", { hide: combineMessage })}>{ message.sender_name || ("User " + message.user_id)}</div>
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
                    <div className={ classNames("chat-message", { today: !!relative_time})}>
                      <div className={classNames("text-center", { hide: isShowDate })}>{ displayDate}</div>
                      <div className={classNames("user-name-display", { hide: combineMessage })}>{ user.first_name + " " + user.last_name}</div>
                      <img className={classNames("img-circle", { hide: !user.avatar_96 })} src={user.avatar_96}  title={ user.first_name }  alt={ user.first_name } />                      
                      <span className={classNames("avatar", { hide: !!user.avatar_96 })}>{avatarText}</span>
                      <div className="message-bubble">
                        { message.text}
                      </div>
                      <p className={ classNames("time-bubble", {hide: !relative_time})}>{relative_time}</p>
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