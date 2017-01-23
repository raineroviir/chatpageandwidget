import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { styles } from './styles.scss';
import { Link } from 'react-router';
import { MaterialInput } from '../../MaterialInput';
import { AutoDetectCard } from '../../../modules/AutoDetectCard';
import classNames from 'classnames';
import { LoadStripe } from '../../../modules/LoadStripe';
import * as UpgradeActions from '../../../actions/Upgrade';
import { browserHistory } from 'react-router';

export class UpdateCard extends Component {
    constructor( props ) {
      super( props );
      this.state = {
        errorMessage: '',
        cardNumberValidation:false,
        expDateValidation: false,
        cvcNumberValidation: false,
        promoCodeValidation: false,
        cardNumberTouched : false,
        expDateTouched : false,
        cvcNumberTouched : false,
        enableFormSubmit: false,
        cardNumber: '',
        expDate: '',
        cvcNumber: ''
      }
    }


    inputBlur( key, e ) {
      let newState = {};
      newState[ key + 'Touched' ] = true;
      this.setState(newState);
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
      
      newState[key] = value;  
      
      if( key === 'cardNumber' || key === 'expDate' || key === 'cvcNumber'  ) {
        let validateObj = {
          cardNumber : this.state.cardNumber,
          expDate : this.state.expDate.trim(),
          cvcNumber : this.state.cvcNumber
        }
        if( key === 'expDate' ) {
          validateObj[ key ] = value.trim();  
        } else {
          validateObj[ key ] = value;
        }
        
        newState.enableFormSubmit = this.validateForm( validateObj )
        this.setState( newState );
      }
    }


    componentWillMount() {
      LoadStripe();
    }

    updateCard( e ) {
      e.preventDefault();
      if( !this.state.enableFormSubmit ) {
        return;
      }
      this.setState({
        errorMessage: ''
      });
      let $form = $('#update-card');
      this.props.actions.updateCard( $form[0], this.props.email, ( status, res ) => {

        if( status === 'error' ) {
          this.setState({
            errorMessage: res
          });
        } else {
          browserHistory.push('/settings/billing-payment');
          alert( 'Updated card details Successfully' );
        }
      } );
    }

    render(){
        return (
            <div className="update-card">
              <div className="ovel-close-wrapper">
                <Link to="/settings/billing-payment" className="ovel-close" ></Link>
              </div>
              <div className="upgrade-form-view">
                <div className="history-close-wrapper">
                  <Link to="/settings/billing-payment" className="history-close" ></Link>
                </div>
                <h1 className="upgrade-title">
                  Update Credit Card Info
                </h1>
                <div className="upgrade-form-wrapper">
                  <form className="upgrade-form" id="update-card" method="post" onSubmit={this.updateCard.bind(this)}>
                    <div className="form-header">
                      All transactions are secure and encrypted.
                    </div>
                    <div className={"error-message" + (this.state.errorMessage?'':' hide') }>
                      Error: { this.state.errorMessage }
                    </div>
                    <div className="form-row">
                      <div className={ classNames("field-wrapper card-number-wrapper",
                        {
                          'error-field': this.state.cardNumberTouched && 
                         !this.state.cardNumberValidation
                        })
                      }
                      >
                        <MaterialInput>
                          <label>Card number</label>
                          <input type="text" 
                          className="input-field" 
                          autoFocus
                          value={this.state.cardNumber}
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
                          value={this.state.expDate}
                          onChange={this.inputChange.bind(this,'expDate')}
                          onBlur={this.inputBlur.bind(this, 'expDate')}
                          /> 
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
                          value={this.state.cvcNumber}
                          onChange={this.inputChange.bind(this,'cvcNumber')}
                          onBlur={this.inputBlur.bind(this, 'cvcNumber')}
                          /> 
                        </MaterialInput>
                      </div>
                    </div>

                    <div className="form-row buttons-wrapper">
                      <button className= "cc-btn submit-btn"
                        disabled = { !this.state.enableFormSubmit }
                      >Update</button>
                      <div className="powered-by">
                        Powered by stripe
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        );
    }
}



function mapStateToProps(state) {
  return {
    email: state.userinfo.userinfo.email
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators( UpgradeActions, dispatch )
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(UpdateCard)