import React, { Component } from 'react';
import { connect } from 'react-redux';



/* component styles */
import { styles } from './styles.scss';


export class Loader extends Component {
  constructor( props ) {
    super(props);
  }

  render() {
    return (
      <div className={ this.props.loader.showLoader ? 'loader-wrapper show' : 'loader-wrapper'  }>
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>      
    );
  }
}

function mapStateToProps(state) {
  return {
    loader: state.loader
  }
}


export default connect(
    mapStateToProps
)(Loader);