import React, { Component, PropTypes } from 'react';
import { common, classNames, Link } from './../common';
import * as tabNavActions from '../../../actions/TabNav';


export class PersonalSettings extends Component {
    constructor( props ){
        super( props );
    }


    render() {
        return (
          <div>
              PersonalSettings
          </div>
        )
    }
}


export default common( {
  component: PersonalSettings,
  mapStateToProps: ( state ) => {
    return {
      tabnav: state.tabnav  
    }
  },
  actions : {
    tabNavActions: tabNavActions
  }
} );