import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as RegistrationActions from '../../../actions/Registration';
import classNames from 'classnames';
import { browserHistory } from 'react-router';
import successImage from '../../images/success.png';

export class RegisterOrgSucessComp extends Component {

  constructor(props) {
    super(props);
    this.state = {};
   
  }

  handleNext(evt){
   //console.log(this.props.registrationDetails);
    if (typeof(Storage) !== "undefined") {
      //window.location.hash = "#/" + localStorage.getItem("user_channel");
      browserHistory.push("/dashboard/" + localStorage.getItem("user_channel"));
      localStorage.setItem("user_channel", "");
    }
  }

  

  render() { 

  //  console.log("SignUpRegistrationComponentRender"+this.props.registrationDetails);
    
    return (
     <div id="signupbox" className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <form id="signupform" className="form-horizontal domain-form" role="form">
            <img className="logo" src="dist/images/logo.svg" title="Chat Center" />
                <img src={successImage}  className="success-image"/>
                <h1 className="upgrade-title">You are all set</h1>
                <p>Time to make some happy customers!</p>
               <div className="form-group button-wrapper">
                    <div className="col-sm-12">
                      <div className="row">
                    
                      <button type="submit" ref="nextButton" className="btn btn-default sign-in domain-big-button" onClick={this.handleNext.bind(this)}>GO TO MY CHAT CENTER</button>
                    </div>
                    </div>
                </div>
                </form> 
            </div>
    );
  }
}

//PropTypes required to make sure props are  formed as per the component requirement, else will throw an error in
//console. This is used only in developers mode.
RegisterOrgSucessComp.propTypes = {
  handleNext: PropTypes.func.isRequired
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
)(RegisterOrgSucessComp)