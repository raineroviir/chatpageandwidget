import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';

export class RegisterOrgNameComp extends Component {

  constructor(props) {
    super(props);
  }

  handleNext(evt){
    evt.preventDefault();
    let RegisterOrganisationName = this.refs.RegisterOrganisationName.value;
    this.props.handleNext(RegisterOrganisationName);
  }

  inputChange(){
    this.refs.nextButton.disabled = !(this.refs.RegisterOrganisationName.value)
  }
  componentDidMount() {
    this.refs.nextButton.disabled = true;
  }

  render() { 

    return (
      <div id="signupbox"  className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal" role="form">
                <div className="user-status"><span className="offline"></span><span className="inactive"></span><span className="online"></span></div>
                <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <h1 className="title">Name your chat.center</h1>
                <div className="desc">comp eExamples: chat.center/you; yourteam.chat.center/you; chat.yourdomain.com/you</div>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon user-name" id="username-addon"><img src="dist/images/user-icon.svg" /></span>
                  <input type="text" className="form-control" ref="RegisterOrganisationName" placeholder="Organisation, Team, Department Name" onChange={this.inputChange.bind(this)} aria-describedby="username-addon" />
                </div> 
                
                <div className="form-group button-wrapper">
                  <div className="col-sm-12">
                    <button type="button" className="btn btn-default back" onClick={this.props.handleBack}>BACK</button>
                    <button type="submit" ref="nextButton" className="btn btn-default sign-in pull-right" onClick={this.handleNext.bind(this)}>NEXT</button>
                  </div>
                </div>            
            </form>
       </div> 
    );
  }
}

//PropTypes required to make sure props are  formed as per the component requirement, else will throw an error in
//console. This is used only in developers mode.
RegisterOrgNameComp.propTypes = {
  handleBack:PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
}