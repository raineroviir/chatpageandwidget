import React, { Component, PropTypes } from 'react';
import { common, classNames, Link } from './../common';
import * as tabNavActions from '../../../actions/TabNav';


export class SettingsOrganization extends Component {
    constructor( props ){
        super( props );
    }


    render() {
        return (
          <div>
              SettingsOrganization
          </div>
        )
    }
}


export default common( {
  component: SettingsOrganization,
  mapStateToProps: ( state ) => {
    return {
      tabnav: state.tabnav  
    }
  },
  actions : {
    tabNavActions: tabNavActions
  }
} );