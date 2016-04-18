import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../../actions/Registration'; 

export class RegisterTeamPersonalAddress extends Component {

  handleBack(){
    window.location.hash = "#/register/team/personal/detail";
  }

  handleNext(){
    
    let RegisterChannel = this.refs.RegisterChannel.value;

    if(RegisterChannel === ''){
      alert('please enter team name');
      return;
    } 

    //store the value in STORE by dispatching event in action
    this.props.actions.registerChannel(RegisterChannel);
    window.location.hash = "#/register/team/verify";
  }

  render() {
    return (
      <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Pick your personal chat address</h1>
                <div className="desc">Examples: chat.center/you; yourteam.chat.center/you; chat.yourdomain.com/you</div>
                <div className="input-group input-group-lg">
                  <span>http://extraordinaryfoods.chat.center</span>
                  <input type="text" className="form-control" ref="RegisterChannel" placeholder="/alex" aria-describedby="username-addon" />
                </div> 
                <div className="desc">
                  <ul><li>- Use this chat address to log in.</li>
                      <li>- Anyone from your team and from the outside world will be able to use it to start a chat with you by typing your chat address in any browser on any device.</li>
                      <li>- Your team members can refer to you by using <a href="javascript">@username</a></li>
                    </ul> 
                  </div>   
                <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <button type="button" className="btn btn-default back" onClick={this.handleBack}>BACK</button>
                      <button type="button" className="btn btn-default sign-in" onClick={this.handleNext.bind(this)}>NEXT</button>
                    </div>
                </div>           
            </form>
       </div> 
    );
  }
}

RegisterTeamPersonalAddress.propTypes = {
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
)(RegisterTeamPersonalAddress)