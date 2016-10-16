import React, { Component, PropTypes } from 'react';
import { common, classNames, Link } from './../common';
import * as tabNavActions from '../../../actions/TabNav';
import * as upgradeActions from '../../../actions/Upgrade';
import { browserHistory } from 'react-router';
import ApiService  from '../../../api.service';

import styles from './styles.scss';


export class BillingPayment extends Component {
    constructor( props ){
        super( props );
        this.state = {
          outstandingAmount: false
        };

        ApiService.api({
          action: "widget.plans.outstandingAmount"
        })
        .then(res=>{
          this.setState({
            outstandingAmount: res.amount
          })
        },err=>{
          console.log('outstandingAmount', err);
        });
    }

    componentWillMount() {
      this.props.tabNavActions.setTabNavState( false );
    }

    navigateToUpgradePlans( e ) {
        e.preventDefault();
        this.props.upgradeActions.updateUpgradeSource({
            from: '/settings/billing-payment',
            label: 'Billing & Payment'
        });
        browserHistory.push( "/upgrade/plans" );   
    }

    render() {
        return (
          <div className="billing-settings">
            <h2 className="primary-label">Current plan: {window.config.cc} plus.</h2>
            <div>
              <a className="cc-btn" href="/upgrade/plans"
              onClick={this.navigateToUpgradePlans.bind(this)}>View Plans</a>
            </div>
            <div className="payment-method">
              <h2 className="primary-label">Payment method</h2>
              <p className="card-number">
                VISA **** 4181
              </p>
              <div>
                <Link to="/upgrade/update-card" className="cc-btn">Change Card</Link>
              </div>
            </div>

            <div className="next-billing-cycle">
              {
                this.state.outstandingAmount != false ?
                <div>
                  <span className="primary-label">
                  Next billing cycle:
                  </span>
                  <span>
                  &nbsp; ${this.state.outstandingAmount} on 21 July 2016
                  </span>
                </div>  
                :
                ''
              }
              

              <p>
                <Link  to="/upgrade/history"  className="primary-link">
                  View transaction history
                </Link>
              </p>
            </div>


          </div>
        )
    }
}


export default common( {
  component: BillingPayment,
  mapStateToProps: ( state ) => {
    return {
      tabnav: state.tabnav  
    }
  },
  actions : {
    tabNavActions: tabNavActions,
    upgradeActions: upgradeActions
  }
} );