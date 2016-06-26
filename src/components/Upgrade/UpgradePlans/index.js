import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as UpgradeActions from '../../../actions/Upgrade';;
import { bindActionCreators } from 'redux';
import { styles } from './styles.scss';

export class UpgradePlans extends Component {
    constructor( props ) {
        super( props );
    }

    componentWillMount() {
    }

    render(){
        return (
            <div className="upgrade-plans">
                <div className="upgrade-breadcrumb">
                  <a className="back-link" href="#/dashboard"> Widget Appearence </a>
                </div>
                <h1 className="upgrade-title">Chat Center plans</h1>
                <div className="plan-term">
                  <ul>
                    <li>
                      <a className="active-link">Annual</a>
                    </li>
                    <li>
                      <a>Monthly</a>
                    </li>
                  </ul>
                </div>
                <div className="plans-details">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="plan-title-wrapper">
                        <div className="plan-title">
                          Free
                        </div>
                      </div>
                      <div className="plan-details">
                        <div className="plan-details-title">
                          Basic
                        </div>
                        <div className="plan-detail-desc">
                          <p>
                            Unlimited channels, team members and messages
                          </p>
                          <p>
                            Direct team messages
                          </p>
                          <p>
                            External and internal channels
                          </p>
                        </div>
                        <div className="buttons-wrapper">
                          <button className="cc-btn disabled">
                            CURRENT PLAN
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="plan-title-wrapper">
                        <div className="plan-title">
                          $4.99/mo
                        </div>
                        <div className="plan-title-desc">
                          per team member
                        </div>
                      </div>
                      
                      <div className="plan-details">
                        <div className="plan-details-title">
                          Plus
                        </div>
                        <div className="plan-detail-desc">
                          <p>
                            All features from free version of Chat Center
                          </p>
                          <p>
                            Dashboard with statistics and information about your clients
                          </p>
                          <p>
                            Website widget customization
                          </p>
                        </div>
                        <div className="buttons-wrapper">
                          <button className="cc-btn">
                            UPGRADE
                          </button>
                        </div>

                      </div>
                      
                    </div>
                    <div className="col-sm-4">
                      <div className="plan-title-wrapper">
                        <div className="plan-title">
                          $9.99/mo
                        </div>
                        <div className="plan-title-desc">
                          per team member
                        </div>
                      </div>
                      
                      <div className="plan-details">
                        <div className="plan-details-title">
                          Premium
                        </div>
                        <div className="plan-detail-desc">
                          <p>
                            All of the features  of Chat Center Plus
                          </p>
                          <p>
                            You'll can completley remove Chat Center Branding
                          </p>
                        </div>
                        <div className="buttons-wrapper">
                          <button className="cc-btn">
                            UPGRADE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bottom-row-buttons row">
                    <div className="col-sm-4">
                      <button className="cc-btn disabled">
                        UPGRADE
                      </button>
                    </div>
                    <div className="col-sm-4">
                      <button className="cc-btn">
                        UPGRADE
                      </button>
                    </div>
                    <div className="col-sm-4">
                      <button className="cc-btn">
                        UPGRADE
                      </button>
                    </div>
                  </div>
                </div>

            </div>
        );
    }
}

UpgradePlans.propTypes = {
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
)(UpgradePlans)