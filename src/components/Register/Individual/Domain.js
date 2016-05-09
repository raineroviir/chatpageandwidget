import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import { styles } from '../styles.scss';

export class RegisterIndividualDomain extends Component {  

  constructor(props) {
    super(props);
    this.state = {};
    this.state.channel=this.props.registrationDetails.Organisation.payload.channel;
  }

  handleBack(){
    //console.log('Moving 1 step back');
    window.location.hash = "#/signup/individual/";
  }

  handleNext(e){         
    e.preventDefault();
    this.refs.createBtn.disabled = true;

    let RegisterChannel = this.refs.Channel.value;

    //store the value in STORE by dispatching event in action
    this.props.actions.registerChannel(RegisterChannel);
    this.props.actions.submitRegistration();
  }
  inputChange(){
    if(this.state.channel === ''){
      this.refs.createBtn.disabled = !this.refs.Channel.value
    } else {
       this.refs.createBtn.disabled = false;
    }
  }

  componentDidMount() {
    if(!this.state.channel ){
      this.refs.createBtn.disabled = true;
    }
    this.refs.Channel.value = this.state.channel;
  }

  render() {
    
    //redirect to first page if refreshed
    let wrapperCls = '';
    let imgSrc = '';
    if(this.props.registrationDetails.Organisation.error) {
      wrapperCls = 'error';
      imgSrc = '-error';
    }
    if(this.props.registrationDetails.Organisation.payload.first_name === ''){
      window.location.hash = "#/signup/individual";
    }


    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal ind-domain-form" role="form">
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="inner-title">Your personal chat address</h1>
                
                <div className={'input-group input-group-lg ' + wrapperCls}>

                  <label htmlFor="username" className="input-group-addon user-name" id="username-addon"><img className="prefix" src={'dist/images/user-icon' + imgSrc + '.svg'} /><span className="prefix-text">https:<span className="double-slashes">//</span>chat.center/</span></label>
                  <input autoFocus id="username" type="text" className="form-control" ref="Channel" placeholder="address" aria-describedby="username-addon" onChange={this.inputChange.bind(this)} />
                  
                </div> 
                <p className="error-msg">This name is already taken</p>
                <div className="own-domain-wrapper">
                      <a className="own-domain pull-right" href="javascript:;" title="Use my own domain">Use my own domain</a>
                </div> 
                 
                <div className="desc">
                  This is your personal chat address anybody will be able to reach you using this address. 
                </div>
                <div className="desc">
                  You will be able to create more, for various needs once you created your chat.center
                </div>
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                        <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                        <button type="submit" className="btn btn-default sign-in pull-right domain-big-button" ref="createBtn" onClick={this.handleNext.bind(this)}>CREATE <span className="domain-big">MY CHAT.CENTER</span></button>
                      </div>
                  </div>
                </div>
            </form>
       </div> 
    );
  }
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