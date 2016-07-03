import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as UpgradeActions from '../../../actions/Upgrade';;
import { bindActionCreators } from 'redux';
import { styles } from './styles.scss';
import { Link } from 'react-router';
import {PlanDetails} from './plan-details';

export class UpgradePlans extends Component {
    constructor( props ) {
        super( props );
    }

    componentWillMount() {
      
    }

    componentDidMount() {
      this.props.actions.getPlanDetails();
    }

    setActiveTab( value, e ) {
      e.preventDefault();
      this.props.actions.updateUpgradePlanKey({
        'activePlanTab': value
      });

    }

    render(){
        return (
            <div className="upgrade-plans">
                <div className="upgrade-breadcrumb">
                  <Link className="back-link" to="/widget/appearance"> Widget Appearence </Link>
                </div>
                <h1 className="upgrade-title">Chat Center plans</h1>
                <div className="plan-term">
                  <ul>
                    <li>
                      <a href="#" 
                      onClick={this.setActiveTab.bind(this, 'annual')} 
                      className={ this.props.upgradePlan.activePlanTab  === 'annual' ? 'active-link' : '' }  
                      >Annual</a>
                    </li>
                    <li>
                      <a href="#" 
                      onClick={this.setActiveTab.bind(this, 'monthly')} 
                      className={ this.props.upgradePlan.activePlanTab  === 'monthly' ? 'active-link' : '' }  
                      >Monthly</a>
                    </li>
                  </ul>
                </div>
                
                <PlanDetails  
                currentPlan={this.props.upgradePlan.currentPlan} 
                plans={this.props.upgradePlan.plans}
                updateUpgradePlanKey={this.props.actions.updateUpgradePlanKey}
                />
            </div>
        );
    }
}

UpgradePlans.propTypes = {
  actions: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    upgradePlan: state.upgradePlan
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UpgradeActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(UpgradePlans)