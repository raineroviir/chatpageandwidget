import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class GuestInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.first_name=this.props.guest.first_name;
    this.state.last_name=this.props.guest.last_name;
    this.state.email=this.props.guest.email;
  }
  registerGuestInfo(e){
    e.preventDefault();
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Email = this.refs.Email.value;

    //store the value in STORE by dispatching event in action
    this.props.registerGuestInfo({email: Email, first_name: FirstName, last_name: LastName});
  }
  inputChange(){
    this.refs.nextBtn.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && this.validateEmail(this.refs.Email.value))
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  componentDidMount() {
    if(!(this.state.first_name && this.state.last_name && this.validateEmail(this.state.email))){
      this.refs.nextBtn.disabled = true;
    }
    this.refs.FirstName.value = this.state.first_name;
    this.refs.LastName.value = this.state.last_name;
    this.refs.Email.value = this.state.email;
  }

  render() {
    return (
      <div className="modal fade" tabIndex="-1" role="dialog" id="signupbox">
      <div className="modal-dialog" role="document" style={ {width: "auto"}}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" id="guest_modal_dismiss" data-dismiss="modal" aria-label="Close" style={{ background: "transparent"}}><span aria-hidden="true">&times;</span></button>
            <button type="button" className="hide" id="guest_modal" data-toggle="modal" data-target="#signupbox">&nbsp;</button>
            <h1 className="modal-title inner-title">Your personal details</h1>
          </div>
          <div className="modal-body">
            <div className="input-group input-group-lg">
              <label htmlFor="firstName" className="input-group-addon" id="first-name-addon"><img src="dist/images/user-icon.svg" /></label>
              <input autoFocus id="firstName" type="text" className="form-control first-name" ref="FirstName" placeholder="First name" aria-describedby="first-name-addon" onChange={this.inputChange.bind(this)} />
            </div>
             <div className="input-group input-group-lg">
              <label htmlFor="lastName" className="input-group-addon" id="last-name-addon"><img src="dist/images/user-icon.svg" /></label>
              <input id="lastName" type="text" className="form-control last-name" ref="LastName" placeholder="Last name" aria-describedby="last-name-addon" onChange={this.inputChange.bind(this)} />
            </div>
            <div className="input-group input-group-lg">
              <label htmlFor="email" className="input-group-addon email" id="email-addon"><img src="dist/images/iconMail.svg" /></label>
              <input id="email" type="email" className="form-control" ref="Email" placeholder="Email" aria-describedby="email-addon" onChange={this.inputChange.bind(this)} />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-default sign-in pull-right" ref="nextBtn" onClick={this.registerGuestInfo.bind(this)}>NEXT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
