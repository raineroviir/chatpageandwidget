import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as UpgradeActions from '../../../actions/Upgrade';;
import { bindActionCreators } from 'redux';
import { styles } from './styles.scss';

export class UpgradeForm extends Component {
    constructor( props ) {
        super( props );
    }

    componentWillMount() {
    }

    render(){
        return (
            <div className="upgrade-form-view">
                <div className="upgrade-breadcrumb">
                  <a className="back-link" href="#/upgrade/plans"> Chat Center Plans </a>
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
                <form className="upgrade-form">
                  <div>
                    <span>Hii</span>
                    All transactions are secure and encrypted.
                  </div>

                </form>
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