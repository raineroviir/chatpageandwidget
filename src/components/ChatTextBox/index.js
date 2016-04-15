import React, { Component } from 'react';
//import { Link } from 'react-router';

/* component styles */
//import { styles } from './styles.scss';

export class ChatTextBox extends Component {
  render() {
    return (
      <footer>
           <div className="col-sm-12">
             <div className="input-group">
                <span className="input-group-addon"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></span>
                <input type="text" className="form-control" placeholder="Type here; '/' - commands, '@' - mentions" aria-label="Type here; '/' - commands, '@' - mentions" />
                <span className="input-group-addon">Send</span>
              </div>
            </div>
       </footer>
    );
  }
}
