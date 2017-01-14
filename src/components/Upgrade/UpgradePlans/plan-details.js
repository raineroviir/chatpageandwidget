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
      if( plan.stripe_id === this.props.currentPlan.stripe_id ) {
        e.preventDefault();
        return;  
      }
      this.props.updateUpgradePlanKey({
          choosedPlan: plan
      });

    }
    
    
    render(){
      let getButtonvalue = (plan) => {
      if(this.props.currentPlan.stripe_id == 'free'){
        return 'UPGRADE';
      }else if(this.props.currentPlan.stripe_id == 'premium' || this.props.currentPlan.stripe_id == 'premium_yearly'){
        if(plan.stripe_id == 'plus' || plan.stripe_id == 'plus_yearly'|| plan.stripe_id =='free' ){
          return 'DOWNGRADE';
        }else{
          return 'UPGRADE';
        }
        
        
      }
      else if(this.props.currentPlan.stripe_id == 'plus' || this.props.currentPlan.stripe_id == 'plus_yearly'){
        if(plan.stripe_id == 'premium' || plan.stripe_id == 'premium_yearly'){
          return 'UPGRADE';
         }else{
          return 'DOWNGRADE';
         }
      }
     
    }
        let planDesc = {
          'free': <div className="plan-detail-desc">
                      <p>
                        Unlimited channels, team <br/>members and messages
                      </p>
                      <p>
                        Direct team messages
                      </p>
                      <p>
                        External and internal <br/>channels
                      </p>
                    </div>,
          'plus': <div className="plan-detail-desc">
                      <p>
                        All features from free <br/>version of Chat Center
                      </p>
                      <p>
                        Dashboard with <br/> statistics and <br/>information about  <br/>your clients
                      </p>
                      <p>
                        Website widget <br/>customization
                      </p>
                    </div>,
          'premium' : <div className="plan-detail-desc">
                      <p>
                        All of the features <br/> of Chat Center Plus
                      </p>
                      <p>
                        You'll can completley <br/>remove Chat Center <br/>Branding
                      </p>
                    </div>
        };

        planDesc.plus_yearly = planDesc.plus;
        planDesc.premium_yearly = planDesc.premium;



        return (
              this.props.requestStatus === 'loaded' ?
              (this.props.plans.length > 0 ?
              <div className={"plans-details"}>

                <div className="row">
                  {
                    this.props.plans.map( (plan, index) => {
                      let planAmount =  plan.amount;
                      return (<div className="col-sm-4" key={index}> 
                        <div className="plan-title-wrapper">
                          <div className="plan-title">
                            { ( planAmount >0 ? "$" + (planAmount) + "/mo" : "Free") }
                          </div>
                          <div className="per-team-member">
                            { ( planAmount >0 ? 'per team member' : '') }
                          </div>
                        </div>
                        <div className="plan-details">
                          <div className="plan-details-title">
                            {plan.name}
                          </div>
                          {
                            planDesc[ plan.stripe_id.toLowerCase() ]
                          }
                          <div className="buttons-wrapper">
                            <Link to="/upgrade/form"  
                            onClick={this.choosePlan.bind(this, plan)}
                            className={
                              "cc-btn " +
                              ( plan.stripe_id === this.props.currentPlan.stripe_id  ? 'disabled' : '' )
                            }
                            >
                              {
                              (plan.stripe_id === this.props.currentPlan.stripe_id  ? 'CURRENT PLAN' : getButtonvalue(plan))
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
                            ( plan.stripe_id === this.props.currentPlan.stripe_id  ? 'disabled' : '' )
                          }
                          >
                            {
                              (plan.stripe_id === this.props.currentPlan.stripe_id  ? 'CURRENT PLAN' : getButtonvalue(plan))
                            }
                          </Link>
                        </div>)
                    })
                  }
                  </div>
              </div> 
              :
              <div className="common-error-message">
                No plans Available
              </div>) : <span></span>
            
            
        );
    }
}
