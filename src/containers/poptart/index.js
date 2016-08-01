import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PoptartActions from '../../actions/Poptart';


/* component styles */
import { styles } from './styles.scss';


export class Poptart extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    return (
      
          this.props.poptart.showPoptart 
          ? 
          (
            <div className="poptart">  
              <div className="poptart-layer" onClick={this.props.actions.hidePoptart}></div>
              <div className="poptart-component">
                  { this.props.poptart && this.props.poptart.component }
              </div>
            </div>
          )
          :
          <span />

      
    );
  }
}

function mapStateToProps(state) {
  return {
    poptart: state.poptart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PoptartActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Poptart);