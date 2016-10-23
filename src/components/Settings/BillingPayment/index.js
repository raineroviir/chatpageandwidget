import React, { Component, PropTypes } from 'react';
import { common, classNames, Link } from './../common';
import * as tabNavActions from '../../../actions/TabNav';
import * as upgradeActions from '../../../actions/Upgrade';
import * as settingsActions from '../../../actions/Settings';
import { browserHistory } from 'react-router';
import ApiService  from '../../../api.service';
import moment from 'moment';

import styles from './styles.scss';


export class BillingPayment extends Component {
    constructor( props ){
        super( props );
        this.state = {
          outstandingAmount: 4.99,
          cardNumber: false
        };
        if( !this.props.billingInfo.cardLastDigits ) {
          this.props.settingsActions.getBillingDetails();  
        }

        
    }

    componentWillMount() {
      this.props.tabNavActions.setTabNavState( false );
    }

    setUpgradeSource( url, e ) {
        e.preventDefault();
        this.props.upgradeActions.updateUpgradeSource({
          from: '/settings/billing-payment',
          label: 'Billing & Payment'
        });

        browserHistory.push( url );   
    }

    render() {
        return (
          <div className="billing-settings">
            <h2 className="primary-label">Current plan: {window.config.cc} plus.</h2>
            <div>
              <a className="cc-btn" href="/upgrade/plans"
              onClick={this.setUpgradeSource.bind(this, '/upgrade/plans')}>VIEW PLANS</a>
            </div>
            {

              this.props.billingInfo.cardLastDigits?
              <div>
                <div className="payment-method">
                  <h2 className="primary-label">Payment method</h2>
                  <p className="card-number">
                    VISA **** {this.props.billingInfo.cardLastDigits}
                  </p>
                  <div>
                    <Link to="/upgrade/update-card" className="cc-btn"
                    onClick={this.setUpgradeSource.bind(this, '/upgrade/update-card')}
                    >CHANGE CARD</Link>
                  </div>
                </div>  
                <div className="next-billing-cycle">
                    <div>
                      <span className="primary-label">
                      Next billing cycle:
                      </span>
                      <span className="next-billing-cycle-data">
                      ${this.props.billingInfo.outstandingAmount} &nbsp; 
                      { moment(this.props.billingInfo.nextBilling).format("LL")}
                      </span>
                    </div>  

                  <p className="transaction-history-link">
                    <Link  to="/upgrade/history"  className="primary-link">
                      View transaction history
                    </Link>
                  </p>
                </div>
              </div>
              :

              ''
            }
            

            
          </div>
        )
    }
}


export default common( {
  component: BillingPayment,
  mapStateToProps: ( state ) => {
    return {
      tabnav: state.tabnav,
      billingInfo: state.billingInfo 
    }
  },
  actions : {
    tabNavActions: tabNavActions,
    upgradeActions: upgradeActions,
    settingsActions: settingsActions
  }
} );