import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as UpgradeActions from '../../../actions/Upgrade';;
import { bindActionCreators } from 'redux';
import { styles } from './styles.scss';
import { Link } from 'react-router';

import { AutoDetectCard } from '../../../modules/AutoDetectCard';

export class UpgradeForm extends Component {
    constructor( props ) {
      super( props );
      this.state = {
        showPromoInput : false,
        promoCode: '',
        cardLogo: '',
        cardNumber: '',
        promoStatus: ''
      };

    }

    togglePromoInput( e ) {
      e.preventDefault();
      this.setState({
        showPromoInput : !this.state.showPromoInput
      });
    }

    inputChange( key, e ) {
      
      this.setState({
        [key]: e.target.value
      });

      if( key === 'cardNumber' ) {
        this.setState({
          cardLogo: AutoDetectCard( e.target.value )
        });
        console.log( 'this.state.cardLogo', this.state.cardLogo );
      }

      if( key === 'promoCode' ) {
        this.setState({
            promoStatus : '' 
        });  
      } 
    }

    submitPromoCode( e ) {
      if( e ) {
        e.preventDefault();  
      }
      if( this.state.promoCode.length === 0 ) {
        return;
      }

      this.setState({
        promoStatus : 'error',
        promoError: 'Invalid Promocode'
      });


    }

    handleEnterPressPromo( e ) {
      if( e.keyCode == 13 ) {
        this.submitPromoCode( e );
        setTimeout(()=>{
          this.setState({
            promoStatus : 'success' 
          });  
        }, 100);
        
      }
    }

    componentWillMount() {
    }

    render(){
        return (
            <div className="upgrade-form-view">
                <div className="upgrade-breadcrumb">
                  <Link className="back-link" to="/upgrade/plans"> Chat Center Plans </Link>
                </div>
                <h1 className="upgrade-title">Upgrade to Chat Center Premium</h1>
                <div className="row selected-details">
                  <div className="col-sm-4">
                    <div className="details-head">
                      Team members
                    </div>
                    <div className="details-cell">
                      2 people
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="details-head">
                      Price per team member
                    </div>
                    <div className="details-cell">
                      $119.99/year
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="details-head">
                      Total
                    </div>
                    <div className="details-cell">
                      $239.98/year
                    </div>
                  </div>
                </div>
                <div className="upgrade-form-wrapper">
                  <form className="upgrade-form">
                    <div className="form-header">
                      All transactions are secure and encrypted.
                    </div>
                    <div className="form-row">
                      <div className="field-wrapper card-number-wrapper">
                        <label>Card number</label>
                        <input type="text" 
                        className="input-field" 
                        value = {this.state.cardNumber}
                        autoFocus
                        onChange={this.inputChange.bind(this,'cardNumber')}
                        /> 
                        <span className={"card-logo " + this.state.cardLogo} >
                        </span>
                      </div>
                    </div>
                    <div className="form-row double-field-wrapper">
                      <div className="field-wrapper">
                        <label>Valid Thru</label>
                        <input type="text" className="input-field" /> 
                      </div>
                      <div className="field-wrapper second-field">
                        <label>Secure code (CVC)</label>
                        <input type="text" className="input-field" /> 
                      </div>
                    </div>

                    <div className={"form-row promo-code-row " + 
                      (this.state.showPromoInput ? '' : ' hide ' ) +
                      'promo-status-' + this.state.promoStatus
                    } >
                      <div className="field-wrapper">
                        <input 
                        type="text" 
                        className="input-field" 
                        placeholder="Promo code" 
                        value = {this.state.promoCode}
                        onChange={
                          this.inputChange.bind(this, 'promoCode')
                        }
                        onKeyDown= {
                          this.handleEnterPressPromo.bind(this) 
                        }
                        />
                        <a href="#" 
                          className={
                            "cc-btn" + (this.state.promoCode.length === 0 ? ' disabled' : '' )
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
                        {this.state.promoError}
                      </span>
                    </div>
                    <div className={"promo-link-wrapper " + ( this.state.showPromoInput ? ' hide' : '' )}>
                      <a href="#" onClick={
                        this.togglePromoInput.bind(this)
                      } className="promo-link"
                        >I have a promo code</a>
                    </div>
                    <div className="form-row buttons-wrapper">
                      <button className="cc-btn submit-btn">Pay $239.98</button>
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
  actions: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UpgradeActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(UpgradeForm)