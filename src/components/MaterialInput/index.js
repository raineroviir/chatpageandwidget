import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class MaterialInput extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      floatLabel: false
    }
    
  }
  componentDidMount() {
    
    this.inputEle = $( ReactDOM.findDOMNode(  this ) ).find( 'input' );

    if( this.inputEle.val() || this.inputEle.is(':focus')) {
      this.setState({
        floatLabel : true
      });
    }

    this.inputEle
    .bind('focus', this.handleFocus.bind(this))
    .bind('blur', this.handleBlur.bind(this))
  }

  handleFocus() {
    this.setState({
      floatLabel: true
    });
  }

  handleBlur() {

    this.setState({
      floatLabel: this.inputEle.val()
    }); 

  }

  componentWillUnmount() {
    this.inputEle
    .unbind('focus', this.handleFocus.bind(this))
    .unbind('blur', this.handleBlur.bind(this))
  }

  render() {
    return (
            <div className={
              "material-input " + 
              ( this.state.floatLabel ? 'float-label' : '' ) 
            }>
              
              {this.props.children}

            </div>
          );
  }
}

