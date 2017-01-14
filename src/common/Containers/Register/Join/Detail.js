import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';
import { browserHistory } from 'react-router';

export class RegisterJoinDetailComp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.first_name=this.props.registrationDetails.Organisation.joinDetails.first_name;
    this.state.last_name=this.props.registrationDetails.Organisation.joinDetails.last_name;
    this.state.Password=this.props.registrationDetails.Organisation.joinDetails.password; 
    this.state.email= this.props.registrationDetails.Organisation.joinDetails.email; 
    this.state.wrapperCls = 'sucess';
    this.state.labelIconClr = 'colorblack';  
  }

  handleNext(e){
    e.preventDefault();
    let FirstName = this.refs.FirstName.value;
    let LastName = this.refs.LastName.value;
    let Password = this.refs.Password.value;
    let Email = this.refs.Email.value;
    //store the value in STORE by dispatching event in action
    this.props.handleNext(this.state.invite_token,FirstName,LastName,Password,this.state.team_name,this.state.email);
  }

  inputChange(){
    this.refs.nextButton.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && this.refs.Password.value && this.refs.Password.value.length>=8 && (this.refs.Email.value.length>0?this.validateEmail(this.refs.Email.value): false));
  }

  componentDidMount() {

    var paths = window.location.href.split('/');
    this.state.team_name = paths[paths.indexOf('join')-1];
    var path_part = paths[paths.indexOf('join')+1];
    var query = path_part.split('?');
    this.state.invite_token = query[0];
    var params = query[1].split('&');

    if(params.length == 1){
      var email_param = params[0].split('=');
     this.state.email = decodeURI(email_param[1]);
    
    }

    this.refs.FirstName.value = this.state.first_name;
    this.refs.LastName.value = this.state.last_name;
    this.refs.Password.value = this.state.Password;
    this.refs.Email.value = this.state.email;

    this.refs.nextButton.disabled = !(this.refs.FirstName.value && this.refs.LastName.value && this.refs.Password.value && this.refs.Password.value.length>=8 && (this.refs.Email.value.length>0?this.validateEmail(this.refs.Email.value): false));
  }
  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
      this.setState({
            wrapperCls: 'sucess',
            labelIconClr:'colorblack'
           
        });
    }else{
       this.setState({
            wrapperCls: 'error',
            labelIconClr:'colorred'
        });
    }
    
    return re.test(email);
  }


  render() {

    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal org-detail-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Your Personal Details</h1>                
                <div className="input-group input-group-lg">
                  <label htmlFor="firstName" className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></label>
                  <input autoFocus type="text" className="form-control first-name" ref="FirstName" placeholder="First Name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <label htmlFor="lastName" className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></label>
                  <input id="lastName" type="text" className="form-control last-name" ref="LastName" placeholder="Last Name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div>
                <div className={'input-group input-group-lg '+ this.state.wrapperCls}>
                  <label  htmlFor="email" className={'input-group-addon email '+this.state.labelIconClr} id="email-addon"><i className="glyphicon glyphicon-envelope"></i></label>
                  <input id="email" type="email" className="form-control" ref="Email" placeholder="Email" onChange={this.inputChange.bind(this)} aria-describedby="email-addon" />
                </div>
                <div className="input-group input-group-lg">
                  <label  htmlFor="password" className="input-group-addon email" id="email-addon"><img src="dist/images/password-icon.svg" /></label>
                  <input id="password" type="password" className="form-control" ref="Password" placeholder="Password" onChange={this.inputChange.bind(this)} aria-describedby="password-addon" />
                </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">                      
                        <button type="submit" ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>NEXT</button>
                      </div>
                    </div>
                </div>           
            </form>
       </div> 
    );
  }
}

RegisterJoinDetailComp.propTypes = {
  //actions: PropTypes.object.isRequired
}
