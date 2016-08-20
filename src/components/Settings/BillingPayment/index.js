import React, { Component, PropTypes } from 'react';
import { common, classNames, Link } from './../common';
import * as tabNavActions from '../../../actions/TabNav';


export class BillingPayment extends Component {
    constructor( props ){
        super( props );
    }


    render() {
        return (
          <div>
              BillingPayment
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
    tabNavActions: tabNavActions
  }
} );