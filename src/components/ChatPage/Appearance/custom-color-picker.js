import React, { Component, PropTypes } from 'react';

import { SketchPicker } from 'react-color';

export class CustomColorPicker extends Component {
    constructor(props){
        super( props );
        this.state = {
            selectedColor: this.props.color
        }
    }

    hideColorPicker( e ) {
        e.preventDefault();
        this.props.closeColorPicker();   
    }
    setSelectedColor( color ) {
        this.setState({
            selectedColor: color.hex
        } );
    }

    selectColor( e ) {
        e.preventDefault();
        this.props.onSelect( this.state.selectedColor );
        this.props.closeColorPicker();   
    }


    
    render() {

        return (
            <div className="color-picker-model"
                style = {
                    {
                        left: this.props.left,
                        top: this.props.top
                    }
                }
            >
                
                    <SketchPicker 
                    className="sketch-picker"
                    color={ this.state.selectedColor }
                    onChangeComplete = { this.setSelectedColor.bind(this) }
                    />
                
                <div className="buttons-holder">
                    
                    <a onClick={this.hideColorPicker.bind(this)} 
                    className="cc-btn pull-left negative-btn"
                    href="#"
                    >
                        Cancel
                    </a>
                    <a onClick={this.selectColor.bind(this)}
                    href="#" 
                    className="cc-btn pull-right">select</a>

                </div>
            </div>);
    }
}