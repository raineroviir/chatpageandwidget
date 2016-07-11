import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as UpgradeActions from '../../../actions/Upgrade';;
import { bindActionCreators } from 'redux';
import { MaterialInput } from '../../MaterialInput';
import { styles } from './styles.scss';
import { Link } from 'react-router';
import { AutoDetectCard } from '../../../modules/AutoDetectCard';
import { LoadStripe } from '../../../modules/LoadStripe';
import { browserHistory } from 'react-router';
export class UpgradeForm extends Component {
    constructor( props ) {
      super( props );
      this.state = {
        showPromoInput : false,
        errorMessage: '',
        cardNumberValidation:false,
        expDateValidation: false,
        cvcNumberValidation: false,
        promoCodeValidation: false,
        cardNumberTouched : false,
        expDateTouched : false,
        cvcNumberTouched : false,
      };
    }

    inputBlur( key, e ) {
      let newState = {};
      newState[ key + 'Touched' ] = true;
      this.setState(newState);
    }

    togglePromoInput( e ) {

      e.preventDefault();
      this.setState({
        showPromoInput : !this.state.showPromoInput
      });
      setTimeout( ()=> {
        this.refs.promoCode.focus();  
      }, 10 );
    }
    
    validateForm( obj ) {
      
      let reg ={
        expDate : /^((0[1-9]|1[012])(\s*)\/(\s*)\d{2}$)/,
        cvcNumber : /^\d{3}$/,
        cardNumber : /^(((\d{4})( \d{4}){2,4})$)|(^\d{12,20})$/
      };

      let validate = true;
      for( let key in obj ) {
        validate = validate & reg[ key ].test( obj[ key ] );
        this.setState({
          [key + 'Validation'] : reg[ key ].test( obj[ key ] )
        });
      }
      
      return validate;

    }

    inputChange( key, e ) {
      let newState = {};
      let value = e.target.value;
      if( key === 'cardNumber' ) {
        this.setState({
          cardLogo: AutoDetectCard( value )
        });
      }
      if( key === 'promoCode' ) {
        if( this.props.upgradeForm.couponReqStatus ) {
          return;
        }
        newState.promoStatus = '';
        if( value.length ) {
          newState.promoBtnState = true;
        } else {
          newState.promoBtnState = false;
        }
      } 

      newState[key] = value;  
      
      if( key === 'cardNumber' || key === 'expDate' || key === 'cvcNumber'  ) {
        let validateObj = {
          cardNumber : this.props.upgradeForm.cardNumber,
          expDate : this.props.upgradeForm.expDate.trim(),
          cvcNumber : this.props.upgradeForm.cvcNumber
        }
        if( key === 'expDate' ) {
          validateObj[ key ] = value.trim();  
        } else {
          validateObj[ key ] = value;
        }
        newState.enableFormSubmit = this.validateForm( validateObj );  

      }

      
      
      this.props.actions.updateUpgradeFormKey(newState);
      
    }

    submitPromoCode( e ) {
      if( e ) {
        e.preventDefault();  
      }

      if( this.props.upgradeForm.promoBtnState ) {
        this.props.actions.validateCoupon( this.props.upgradeForm.promoCode );  
        this.props.actions.updateUpgradeFormKey({
          promoBtnState: false,
          couponReqStatus: true
        });

      }
    }
    submitPayment(  e ) {      
      e.preventDefault();
      if( this.props.upgradeForm.enableFormSubmit ) {
        this.setState({
          errorMessage: ''
        });
        
        let $form = $('#payment-form');
        this.props.actions.updateUpgradeFormKey({
          paymentReqStatus: true,
          enableFormSubmit: false
        });
        this.props.actions.submitPayment( $form[0], {
          plan_id: this.props.upgradePlan.choosedPlan.stripe_id,
          coupon: this.props.upgradeForm.promoCode,
          emailId: this.props.userinfo.userinfo.email
        },  ( status, res ) => {

            this.props.actions.updateUpgradeFormKey({
              paymentReqStatus: false
            });
            if( status === 'error' ) {
              this.setState({
                errorMessage: res
              });
            } else {
              browserHistory.push('/upgrade/success');
            }
        } )
      }
      
      
      
    }
    handleEnterPressPromo( e ) {
      if( e.keyCode == 13 ) {
        this.submitPromoCode( e );       
      }
    }

    componentWillMount() {
      LoadStripe();
      if( !this.props.upgradePlan.choosedPlan.stripe_id ) {
        browserHistory.push("/upgrade/plans");
      }

      this.props.actions.resetUpgradeForm();

    }

    render(){
        let pricePerTeamMember = this.props.upgradePlan.choosedPlan.amount;
       /* if( this.props.upgradePlan.activePlanTab === 'year' ) {
          pricePerTeamMember -=  1;
          pricePerTeamMember *= 12;
        }*/
        return (
            <div className="upgrade-form-view">
                <div className="upgrade-breadcrumb">
                  <Link className="back-link" to="/upgrade/plans"> Chat Center Plans </Link>
                </div>
                <h1 className="upgrade-title">
                  Upgrade to Chat Center &nbsp;
                  <span className="choosed-plan-name">
                    {this.props.upgradePlan.choosedPlan.name}
                  </span>
                </h1>
                <div className="row selected-details">
                  <div className="col-sm-4">
                    <div className="details-head">
                      Team members
                    </div>
                    <div className="details-cell">
                      {this.props.upgradePlan.memberCount} people
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="details-head">
                      Price per team member
                    </div>
                    <div className="details-cell">
                      ${pricePerTeamMember}/
                      { 
                        this.props.upgradePlan.activePlanTab === 'month' ?
                        'month' : 'year' 
                      }              
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="details-head">
                      Total
                    </div>
                    <div className="details-cell">
                      ${pricePerTeamMember * this.props.upgradePlan.memberCount }/{ 
                        this.props.upgradePlan.activePlanTab === 'month' ?
                        'month' : 'year' 
                      } 
                    </div>
                  </div>
                </div>
                <div className="upgrade-form-wrapper">
                  <form className="upgrade-form" id="payment-form" method="post" onSubmit={this.submitPayment.bind(this)}>
                    <div className="form-header">
                      All transactions are secure and encrypted.
                    </div>
                    <div className={"error-message" + (this.state.errorMessage?'':' hide') }>
                      Error: { this.state.errorMessage }
                    </div>
                    <div className="form-row">
                      <div className={ ("field-wrapper card-number-wrapper" )
                        + 
                         ((this.state.cardNumberTouched && 
                         !this.state.cardNumberValidation)
                         ? 
                        ' error-field' : 
                        '')  
                      }
                      >
                        <MaterialInput>
                          <label>Card number</label>
                          <input type="text" 
                          className="input-field" 
                          value = {this.props.upgradeForm.cardNumber}
                          autoFocus
                          onChange={this.inputChange.bind(this,'cardNumber')}
                          onBlur={this.inputBlur.bind(this, 'cardNumber')}
                          data-stripe="number"
                          /> 
                          <span className={"card-logo " + this.state.cardLogo} >
                          </span>
                        </MaterialInput>
                      </div>
                    </div>
                    <div className="form-row double-field-wrapper">
                      <div className={
                        "field-wrapper" +
                         ((this.state.expDateTouched && 
                         !this.state.expDateValidation)
                         ? 
                        ' error-field' : 
                        '')  
                      }
                      >
                        <MaterialInput>
                          <label>Valid Thru ( MM/YY )</label>
                          <input type="text" className="input-field" 
                          data-stripe="exp"
                          onChange={this.inputChange.bind(this,'expDate')}
                          onBlur={this.inputBlur.bind(this, 'expDate')}
                          value = {this.props.upgradeForm.expDate}/> 
                        </MaterialInput>
                      </div>
                      <div className={
                        ('field-wrapper second-field ') +
                         ((this.state.cvcNumberTouched && 
                         !this.state.cvcNumberValidation)
                         ? 
                        ' error-field' : 
                        '')  
                      }
                      >
                        <MaterialInput>
                          <label>Secure code (CVC)</label>
                          <input type="text" className="input-field" 
                          data-stripe="cvc"
                          onChange={this.inputChange.bind(this,'cvcNumber')}
                          onBlur={this.inputBlur.bind(this, 'cvcNumber')}
                          value = {this.props.upgradeForm.cvcNumber}/> 
                        </MaterialInput>
                      </div>
                    </div>

                    <div className={"form-row promo-code-row " + 
                      (this.state.showPromoInput ? '' : ' hide ' ) +
                      'promo-status-' + this.props.upgradeForm.promoStatus
                    } >
                      <div className="field-wrapper">
                        <MaterialInput>
                          <label>Promo code</label>
                          <input 
                          type="text" 
                          className="input-field" 
                          value = {this.props.upgradeForm.promoCode}
                          onChange={
                            this.inputChange.bind(this, 'promoCode')
                          }
                          ref="promoCode"
                          onKeyDown= {
                            this.handleEnterPressPromo.bind(this) 
                          }
                          />
                        </MaterialInput>
                        <a href="#" 
                          className={
                            "cc-btn" + 
                            (this.props.upgradeForm.promoBtnState === false ? ' disabled' : '' ) +
                            ( this.props.upgradeForm.couponReqStatus === true ? ' wait' : '')

                          }
                          onClick={
                            this.submitPromoCode.bind(this)
                          }

                        > 
                          APPLY CODE
                        </a>
                        <span className={"promo-success"}  >
                        </span>
                      </div>
                      <span className="promo-status-error-msg">
                        {this.props.upgradeForm.promoError}
                      </span>
                    </div>
                    <div className={"promo-link-wrapper " + ( this.state.showPromoInput ? ' hide' : '' )}>
                      <a href="#" onClick={
                        this.togglePromoInput.bind(this)
                      } className="promo-link"
                        >I have a promo code</a>
                    </div>
                    <div className="form-row buttons-wrapper">
                      <button 
                        className={
                          "cc-btn submit-btn " + (this.props.upgradeForm.paymentReqStatus ? ' wait': '')
                        }
                        disabled = { !this.props.upgradeForm.enableFormSubmit }
                      >Pay ${pricePerTeamMember * this.props.upgradePlan.memberCount}</button>
                      <div className="powered-by">
                        Powered by stripe
                      </div>
                    </div>
                  </form>

                </div>
            </div>
        );
    }
}

UpgradeForm.propTypes = {
  actions: PropTypes.object.isRequired,
}


function mapStateToProps(state) {
  return {
    upgradeForm: state.upgradeForm,
    upgradePlan: state.upgradePlan,
    userinfo: state.userinfo
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators( UpgradeActions, dispatch )
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(UpgradeForm)