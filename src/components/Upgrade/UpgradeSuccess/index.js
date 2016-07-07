import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as UpgradeActions from '../../../actions/Upgrade';;
import { bindActionCreators } from 'redux';
import { styles } from './styles.scss';
import { Link } from 'react-router';
import { AutoDetectCard } from '../../../modules/AutoDetectCard';
import successImage from '../../images/success.png';

export class UpgradeSuccess extends Component {
    constructor( props ) {
      super( props );
    }

    componentWillMount() {
    }

    render(){
        return (
            <div className="upgrade-success-view">
                <img src={successImage}  className="success-image"/>
                <h1 className="upgrade-title">You have upgraded to Chat Center Plus</h1>
                <div className="row welcome-details">
                  <div className="col-sm-4">
                    <p>All features from free version of Chat Center</p>
                  </div>
                  <div className="col-sm-4">
                    <p>Dashboard with statistics and information about  your clients</p>
                  </div>
                  <div className="col-sm-4">
                    <p>Website widget customization</p>
                  </div>
                </div>
                <div className="buttons-wrapper">
                  <Link className="cc-btn" to="/dashboard">Finish</Link>
                </div>
            </div>
        );
    }
}

UpgradeSuccess.propTypes = {
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
)(UpgradeSuccess)