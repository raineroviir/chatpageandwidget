import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import { styles } from '../styles.scss';

export class RegisterIndividualDomain extends Component {

  handleBack(){
    //console.log('Moving 1 step back');
    window.location.hash = "#/signup/individual/";
  }

  handleNext(){
        //service call to register and move to chat message home screen

    let RegisterChannel = this.refs.Channel.value;

    //store the value in STORE by dispatching event in action
    this.props.actions.registerChannel(RegisterChannel);
    this.props.actions.submitRegistration();
  }
  inputChange(){
    this.refs.createBtn.disabled = !this.refs.Channel.value
  }
  componentDidMount() {
    this.refs.createBtn.disabled = true;
  }

  render() {
    //const { actions } = this.props
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Your personal chat address</h1>
                
                <div className="input-group input-group-lg">

                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" />https://chat.center/</span>
                  <input type="text" className="form-control" ref="Channel" placeholder="address" aria-describedby="username-addon" onChange={this.inputChange.bind(this)} />
                  
                </div> 
                <div className="error-message">
                {this.props.registrationDetails.Organisation.error}
                </div>
                <div className="col-sm-12 text-center">
                      <a className="quick-link" href="javascript:;" title="Use my own domain">Use my own domain</a>
                </div> 
                 
                <div className="desc">This is your personal chat address anybody will be able to reach you using this address. <br/> <br/>You will be able to create more, for various needs once you created your chat.center</div> 
                <div className="form-group  button-wrapper">
                  <div className="col-sm-12">
                    <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                    <button type="button" className="btn btn-default sign-in" ref="createBtn" onClick={this.handleNext.bind(this)}>CREATE</button>
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