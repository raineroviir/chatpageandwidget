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
    if( messages && messages.length && !this.props.channelError) {
      let lastuser;
      return  (<div className="chat-messages">
          {
            messages.map((message, ind, msgs) => {
              let user = this.props.user.userinfo,
                combineMessage = !!ind && msgs[ind - 1].user_id == message.user_id,
                displayDate = this.computeDate(message.created_at),
                avatarText = message.sender_name ? _.reduce(message.sender_name.split(" "), (res, a) => res + (a + "").charAt(0), "") : ("U" + ((message.user_id) ? (message.user_id + "").charAt(0) : "")),
                isShowDate = !!ind && this.computeDate(msgs[ind - 1].created_at) == displayDate,
                relative_time = displayDate == "today" && moment(message.created_at).format("LT"),
                msg;

              if(user.id != message.user_id && this.props.guest !== message.user_id){
                msg = (
                  <div key={message.id} className={classNames("received-message fade-in", {
                    'same-user': (lastuser === message.user_id && isShowDate && !relative_time)
                  })}>
                    <div className={classNames("text-center separation-text", { hide: isShowDate })}>You</div>
                    <div className="chat-message">
                      <span className={classNames("avatar", { hide: !!message.sender_avatar })}>{avatarText}</span>
                      {/* <img className={classNames("img-circle", { hide: !message.sender_avatar })} src={message.sender_avatar} title={message.sender_name} alt={message.sender_name} /> */}
                      <div className={classNames("user-name-display", { hide: combineMessage })}>{ message.sender_name || ("User " + message.user_id)}</div>
                      <div className="message-bubble" style={{backgroundColor: this.props.widgetConfig.keyColor}}>
                        {message.text}
                      </div>
                    </div>
                  </div>
                )
              }
              else {
                msg = (
                  <div key={message.id}
                  className={classNames("sent-message fade-in", {
                    'same-user': (lastuser === message.user_id && isShowDate && !relative_time)
                  })}>
                    <div className={ classNames("chat-message", { today: !!relative_time})}>
                      <div className={classNames("text-center separation-text", { hide: isShowDate })}>You</div>
                      <div className={classNames("user-name-display", { hide: combineMessage })}>{ (user.first_name && user.last_name) ? user.first_name + " " + user.last_name : ""}</div>
                      {/* <img className={classNames("img-circle", { hide: !user.avatar_96 })} src={user.avatar_96}  title={ user.first_name }  alt={ user.first_name } /> */}
                      <span className={classNames("avatar", { hide: !!user.avatar_96 })}>{avatarText}</span>
                      <div className="message-bubble" style={{backgroundColor: this.props.widgetConfig.keyColor}}>
                        {message.text}
                      </div>
                      <p className={ classNames("time-bubble", {hide: !relative_time})}>{relative_time}</p>
                    </div>
                  </div>
                )
              }
              lastuser = message.user_id;
              return msg;
            })
          }
        </div>);
    } else if(this.props.channelError === true){
      return (<div className="default-message">Channel not found</div>)
    } else {
      return (<DefaultMessage widgetConfig={this.props.widgetConfig} user={this.props.user} />);
    }
  }
  render() {
    let messages = this.props.messages;
    console.log(this.props.widgetConfig.keyColor)
    return (
      <div className="chat-messages-wrapper">
        {this.getMessages(messages)}
      </div>
    );
  }
}
