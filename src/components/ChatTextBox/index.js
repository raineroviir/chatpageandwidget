import React, { Component } from 'react';
//import { Link } from 'react-router';

/* component styles */
//import { styles } from './styles.scss';

export class ChatTextBox extends Component {
  createMessage(){
    if(this.refs.Message.value == "") return;
    this.props.createMessage(this.refs.Message.value);
    this.refs.Message.value = "";
  }
  render() {
    return (
      <footer>
           <div className="">
             <div className="input-group">
                <span className="input-group-addon">
                  <span className="attach-button" aria-hidden="true"></span>
                </span>
                <input ref="Message" type="text" className="form-control" placeholder="Type here; '/' - commands, '@' - mentions" aria-label="Type here; '/' - commands, '@' - mentions" />
                <span className="input-group-addon submit-btn" onClick={ this.createMessage.bind(this)}>Send</span>
              </div>
            </div>
       </footer>
    );
  }
}
