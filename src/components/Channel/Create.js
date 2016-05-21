import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as ChannelActions from '../../actions/Channels';
import classNames from 'classnames';

export class ChannelCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNext(evt){
    evt.preventDefault();
    let avatar = this.refs.avatar.value
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    this.props.handleNext(avatar, name, address);
  }

  inputChange(){
    this.refs.nextButton.disabled = !(this.refs.avatar.value && this.refs.name.value && this.refs.address.value)
  }
  openFileInput() {
    this.refs.avatar.click();
  }

  componentDidMount() {
    this.refs.nextButton.disabled = true;
  }

  render() { 

  //  console.log("SignUpRegistrationComponentRender"+this.props.registrationDetails);
    
    return (
            <div id="create-ext-chat-form"  className="create-ext-chat-form chat-name-address" >
              <div className="section-content">
                <h1 className="section-title-1">Internal group chat</h1>
                <h2 className="section-title">Chat name and address</h2>
                <div className="form-wrapper">
                  <div className="change-image-wrapper">
                    <input id="chatavatar" type="file" className="input-field" ref="avatar" placeholder="avatar" onChange={this.inputChange.bind(this)} aria-describedby="chatavatar-addon" />
                    <div className="change-image">
                      Change Image
                    </div>
                    <div className="browse" onClick={this.openFileInput.bind(this)}>
                      Browse Image
                    </div>
                    
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="chatname">Chat Name</label>
                    <input id="chatname" type="text" className="input-field" ref="name" placeholder="i.e. Sales, Support, etc " onChange={this.inputChange.bind(this)} aria-describedby="chatname-addon" />
                  </div>
                  
                  <div className="input-wrapper">
                    <label htmlFor="chataddress-addon">Chat address</label>
                    <input id="chataddress-addon" type="text" className="input-field" ref="address" placeholder="team.chat.center/address" onChange={this.inputChange.bind(this)} aria-describedby="chataddress-addon" />
                  </div>
                  
                  <div className="button-wrapper">
                    <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
                    <button type="submit" ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>NEXT</button>
                  </div> 
                </div>

              </div>
            </div>
      
    );
  }
}

//PropTypes required to make sure props are  formed as per the component requirement, else will throw an error in
//console. This is used only in developers mode.
ChannelCreate.propTypes = {
  handleBack:PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
}