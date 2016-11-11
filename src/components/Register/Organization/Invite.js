import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import { browserHistory } from 'react-router';
let classNames = require("classnames");

export class RegisterIndividualDomain extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.inputs = [1, 2, 3];
    this.state.isAvoidUpate = !1;
  }

  handleBack(){
    //console.log(this.props.registrationDetails);
    
    browserHistory.push("/signup/organization/sucess");
  }
  deleteMember(member){
    this.props.actions.clearMessages();
    this.props.actions.deleteMember(member);
  }
  handleNext(e){
    e.preventDefault();
    this.props.actions.inviteMembers((this.validInputs(this.state.inputs, true)));
  }

  componentDidMount() {
    this.refs.submitButton.disabled = true;    
  }
  componentWillMount() {
    this.props.actions.fetchMemebers();
  }
  componentDidUpdate() {
    if(this.props.registrationDetails.Organisation.showSuccess && !this.state.isAvoidUpate){
      this.state.inputs.splice(3);
      this.setState({inputs: this.state.inputs, isAvoidUpate: !0});
    }
    if(this.state.isAvoidUpate){
      for(var i=0;i<this.state.inputs.length;i++){
        this.refs["input" + this.state.inputs[i]].value = "";
      }
      this.state.isAvoidUpate = !1;
    } 
  }

  inputChange(event){
    if(this.props.registrationDetails.Organisation.showSuccess || this.props.registrationDetails.Organisation.deleteSuccess) {
      this.props.actions.clearMessages();
    }

    var emptyFields = 0;
    for(var i=0;i<this.state.inputs.length;i++){
      var currentInput = this.state.inputs[i];
      if(this.refs['input'+currentInput].value === ''){
        emptyFields++;
      }
    }
    if(event.target.value === '' && emptyFields>1 && this.state.inputs.length >3){     
      var elm = event.target.id.slice(event.target.id.length-1, event.target.id.length);
      this.state.inputs.splice(this.state.inputs.indexOf(elm),1);
      this.setState({inputs: this.state.inputs});
    }
    if(emptyFields < 1){
      this.state.inputs.push(this.state.inputs.length+1);
      this.setState({inputs: this.state.inputs});
    }
    let valInp = this.validInputs(this.state.inputs);
    this.refs.submitButton.disabled = (valInp.join("") !== "" || valInp.length === this.state.inputs.length);
  }
  validInputs(inputs, isValid){
    let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return inputs.map(val =>  this.refs["input" + val] && this.refs["input" + val].value).filter(inputValue => {
      if(!isValid)
        return !re.test(inputValue)
      else
        return re.test(inputValue)
    });
  }
  render() {
    
    var comp = this;
    
    return (

      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">

            <form id="signupform" className="form-horizontal" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Invite your team</h1>
                <p className={classNames("sucess-msg", {"hide": !this.props.registrationDetails.Organisation.deleteSuccess})}>Members deleted successfully.</p>
                <div className="chat-address">Email addresses</div>
                                
                {this.state.inputs.map(function (result) {
                    if(result === 0){
                      return;
                    }
                     return (<div className="input-group input-group-lg" key={result}>
                      <span className="input-group-addon email" id="email-addon"><img src="dist/images/user-icon.svg" /></span>
                      <input type="email" className="form-control" id={'input'+result} ref={'input'+result} onChange={comp.inputChange.bind(comp)} placeholder="email@domain.com" aria-describedby="email-addon" />
                    </div>);
                })}
                           
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>SKIP</button>
                    <button type="button" 
                    ref="submitButton" 
                    className={classNames("btn btn-default sign-in pull-right", {
                      'btn-loading': this.props.registrationDetails.sendInviteRequestStatus === 'loading'
                    })} 
                    onClick={this.handleNext.bind(this)}

                    >SEND INVITES</button>
                  </div>
                  </div>
                </div>
            </form>
            <h2>Members</h2>
            <div className="moderator-item-wrapper filter-result">
              {
                this.props.registrationDetails.Organisation.members&&this.props.registrationDetails.Organisation.members.map(member => {
                  return (
                    <div className="moderator-item" key={member.id}>
                      <div className="avatar-wrapper">
                        <img  className="avatar-img" />
                        <span className="avatar-text">{member.first_name ? member.first_name[0].toUpperCase() : member.email[0].toUpperCase()}</span>
                      </div>
                      <span className="user-name">{member.first_name ? (member.first_name + ' ' + (member.last_name ? member.last_name : '')) : member.email}</span>

                      <span className="close-wrapper" onClick={this.deleteMember.bind(this, member)}><span className="cc-icon-cross hide"></span></span>
                      <div className="user-chat-address-wrapper">
                        <span className="user-chat-address">{member.username ? (member.team.name + '/' + member.username) : 'NA'}</span>
                      </div>
                    </div>
                  );
                })
              }
              
            </div>
       </div> 
    );
  }
}

RegisterIndividualDomain.propTypes = {
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    registrationDetails: state.registrationDetails
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RegistrationActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(RegisterIndividualDomain)
