import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as ChannelActions from '../../actions/Channels';
import classnames from 'classnames';
import { Link, browserHistory } from 'react-router';

export class ChannelCreate extends Component {

  handleNext(evt){
    evt.preventDefault();
    let attr = {};
    attr.avatar = this.refs.avatar.files[0];
    attr.team = this.props.details.payload.team;
    attr.description = this.refs.description.value;
    attr.channel = this.refs.channel.value;
    this.props.handleNext(attr);
  }

  inputChange(type){
    var self = this;
    if(type == 'file') {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(this.refs.avatar.files[0]);
      oFReader.onload = function (oFREvent) {
          self.refs.avatarPreview.src = oFREvent.target.result;
          self.refs.avatarPreview.style.display = 'block';
      };
    }
    if( type === 'description' ) {
      // capitalize chatname 
      this.refs.description.value = this.refs.description.value.replace(/\b\w/g , function(m){ return m.toUpperCase(); } );
    }    
    this.refs.nextButton.disabled = !(this.refs.description.value && this.refs.channel.value);
    this.refs.saveButton.disabled = !(this.refs.description.value && this.refs.channel.value);
  }
  openFileInput() {
    this.refs.avatar.click();
  }

  componentDidMount() {

    if(!this.props.id && (this.props.details.payload.is_public === "" || this.props.details.payload.is_direct=== "" || this.props.details.payload.is_group==="")) {
      //window.location.hash = "#/channel/type";
      browserHistory.push("/channel/type");
    }
    if(!(this.props.details.payload.description && this.props.details.payload.channel)) {
      this.refs.nextButton.disabled = true;
      this.refs.saveButton.disabled = true;
    }
    /*$('body').keydown(function(e){
        if (e.which==27){
            //window.location.hash = "#/dashboard";
            browserHistory.push("/dashboard");
        }
    });*/
    var self = this;
    this.refs.description.value = this.props.details.payload.description;
    this.refs.channel.value = this.props.details.payload.channel;
    this.refs.avatar.files[0] = this.props.details.payload.avatar;
    if(this.props.details.payload.avatar) {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(this.props.details.payload.avatar);
      oFReader.onload = function (oFREvent) {
          self.refs.avatarPreview.src = oFREvent.target.result;
          self.refs.avatarPreview.style.display = 'block';
      };
    }
    $(document).keyup(this.keyupEvent);
  }

  componentWillUnmount() {
    //unbind the event keyup binded 
    $(document).unbind( 'keyup', this.goToDashboard );
  }
  keyupEvent(e){
      
      if (e.which==27){
          //window.location.hash = "#/dashboard";
          browserHistory.push("/dashboard");
      }
  }

  componentWillMount() { 
    this.props.fetchChannel();
  }

  
  componentDidUpdate() {
    //this.forceUpdate();
    if(this.props.details.payload.id) {
      if(!(this.props.details.payload.description && this.props.details.payload.channel)) {
        this.refs.nextButton.disabled = true;
        this.refs.saveButton.disabled = true;
      } else {
        this.refs.nextButton.disabled = false;
        this.refs.saveButton.disabled = false;
      }
      var self = this;
      this.refs.description.value = this.props.details.payload.description;
      this.refs.channel.value = this.props.details.payload.channel;
      this.refs.avatar.files[0] = this.props.details.payload.avatar;
      if(this.props.details.payload.avatarPreview && !this.props.details.payload.avatar) {
        self.refs.avatarPreview.src = this.props.details.payload.avatarPreview;
        self.refs.avatarPreview.style.display = 'block';
      }
      if(this.props.details.payload.avatar) {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(this.props.details.payload.avatar);
        oFReader.onload = function (oFREvent) {
            self.refs.avatarPreview.src = oFREvent.target.result;
            self.refs.avatarPreview.style.display = 'block';
        };
      }
    }
  }

  render() { 
    //let channel = this.props.details.payload;
    return (
            <div id="create-ext-chat-form"  className="create-ext-chat create-ext-chat-form chat-name-address" >
              <Link to="/dashboard" className="close-wrapper">
                <span className="glyphicon glyphicon-remove"></span>
              </Link>
              <div className="section-content">
                <h1 className="section-title-1" style={{display:((this.props.details.payload.is_public && this.props.details.payload.is_group) ? "" : "none")}}>External group chat</h1>
                <h1 className="section-title-1" style={{display:((this.props.isTeam && this.props.details.payload.is_public && !this.props.details.payload.is_group) ? "" : "none")}}>External Team-to-One chat channel</h1>
                <h1 className="section-title-1" style={{display:((!this.props.isTeam && this.props.details.payload.is_public && !this.props.details.payload.is_group) ? "" : "none")}}>External One-to-One chat channel</h1>
                <h1 className="section-title-1" style={{display:((!this.props.details.payload.is_public) ? "" : "none")}}>Internal group chat</h1>
                <h2 className="section-title">Chat name and address</h2>
                <p className="desc" style={{display:((!this.props.details.payload.is_public) ? "" : "none")}}>Private group chat. Only designated members have access. </p>
                
                <div className="form-wrapper">
                  <div className="change-image-wrapper">
                    <input id="chatavatar" type="file" className="input-field" accept="image/*" ref="avatar" placeholder="avatar" onChange={this.inputChange.bind(this, 'file')} aria-describedby="chatavatar-addon" />
                    <div className="change-image" onClick={this.openFileInput.bind(this)}>
                      <img ref="avatarPreview" src="" title="Channel Avatar" style={{display:'none'}} />
                    </div>
                    <div className="browse" onClick={this.openFileInput.bind(this)}>
                      Browse Image
                    </div>
                    
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="chatname">Chat Name</label>
                    <input id="chatname" type="text" 
                    className="input-field" 
                    ref="description" 
                    placeholder="i.e. Sales, Support, etc " 
                    onChange={this.inputChange.bind(this, 'description')} 
                    aria-describedby="chatname-addon" />
                  </div>
                  <div className="input-wrapper">
                    <label htmlFor="chataddress-addon">Chat address</label>
                    <input id="chataddress-addon" type="text" className="input-field" ref="channel" placeholder="address" onChange={this.inputChange.bind(this)} aria-describedby="chataddress-addon" />
                  </div>
                  <div className={classnames('error-message', { hide: this.props.details.error!='duplicate_channel'})}>
                    This Chat address is not available.
                  </div>
                  <div className={classnames('error-message', { hide: !(this.props.details.error && this.props.details.error!='duplicate_channel')})}>
                    Error in processing the request, please trying again..
                  </div>
                  <div className="button-wrapper">
                    <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
                    <button type="submit" ref="nextButton" className={classnames('btn btn-default sign-in pull-right', { hide: this.props.details.payload.id})} onClick={this.handleNext.bind(this)}>NEXT</button>
                    <button type="submit" ref="saveButton" className={classnames('btn btn-default sign-in pull-right', { hide: !this.props.details.payload.id})} onClick={this.handleNext.bind(this)}>SAVE</button>
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