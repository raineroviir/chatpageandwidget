import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as UpgradeActions from '../../../actions/Upgrade';;
import { bindActionCreators } from 'redux';
import { styles } from './styles.scss';
import { Link } from 'react-router';

export class PlanDetails extends Component {
    constructor( props ) {
        super( props );
    }

    choosePlan( plan, e ) {
      if( plan.name.toLowerCase() === this.props.currentPlan ) {
        e.preventDefault();
        return;  
      }
      debugger;
      this.props.updateUpgradePlanKey({
          choosedPlan: plan
      });

    }
    
    render(){

        let planDesc = {
          'free': <div className="plan-detail-desc">
                      <p>
                        Unlimited channels, team members and messages
                      </p>
                      <p>
                        Direct team messages
                      </p>
                      <p>
                        External and internal channels
                      </p>
                    </div>,
          'plus': <div className="plan-detail-desc">
                      <p>
                        All features from free version of Chat Center
                      </p>
                      <p>
                        Dashboard with statistics and information about your clients
                      </p>
                      <p>
                        Website widget customization
                      </p>
                    </div>,
          'premium' : <div className="plan-detail-desc">
                      <p>
                        All of the features  of Chat Center Plus
                      </p>
                      <p>
                        You'll can completley remove Chat Center Branding
                      </p>
                    </div>
        };

        return (
            <div className={"plans-details"}>

              <div className="row">
                {
                  this.props.plans.map( (plan, index) => {
                    return (<div className="col-sm-4" key={index}> 
                      <div className="plan-title-wrapper">
                        <div className="plan-title">
                          { ( plan.amount !=0 ? "$" + (plan.amount) + "/mo" : "Free") }
                        </div>
                      </div>
                      <div className="plan-details">
                        <div className="plan-details-title">
                          {plan.name}
                        </div>
                        {
                          planDesc[ plan.name.toLowerCase() ]
                        }
                        <div className="buttons-wrapper">
                          <Link to="/upgrade/form"  
                          onClick={this.choosePlan.bind(this, plan)}
                          className={
                            "cc-btn " +
                            ( plan.name.toLowerCase() === this.props.currentPlan  ? 'disabled' : '' )
                          }
                          >
                            {
                              (plan.name.toLowerCase() === this.props.currentPlan  ? 'CURRENT PLAN' : 'UPGRADE')
                            }
                          </Link>
                        </div>
                      </div>
                    </div>)  
                  })
                }
              </div>

              
              <div className="bottom-row-buttons row">
                {
                  this.props.plans.map( (plan, index) => {
                      return ( <div className="col-sm-4" key={index}>
                        <Link onClick={this.choosePlan.bind(this, plan)} to="/upgrade/form"  className={
                          "cc-btn " +
                          ( plan.name.toLowerCase() === this.props.currentPlan  ? 'disabled' : '' )
                        }
                        >
                          {
                            (plan.name.toLowerCase() === this.props.currentPlan  ? 'CURRENT PLAN' : 'UPGRADE')
                          }
                        </Link>
                      </div>)
                  })
                }
                </div>
            </div>
        );
    }
}
