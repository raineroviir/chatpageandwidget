import React, { Component } from 'react';
import { Link } from 'react-router';
//let classnames = require('classnames');

/* component styles */
import { styles } from './styles.scss';

import previewImg from '../../images/preview.png';


export class Appearance extends Component {
    constructor(props){
        super( props );
        this.state = {
            selectedTheme: 'sea-green',
            selectedCode: '#fdb22b',
            customThemeCode: '#fdb22c',
            teamAvatar: false,
            channelLogo:false
        };
        //console.log( 'state', this.state );

    }

    setSelectedTheme( e ) {
        console.log( e.target.value );
    }
    selectTheme( color, e ) {
        e.preventDefault();
        this.setState({
            selectedCode: color.code
        })
    }
    selectCustomTheme( e ) {
        e.preventDefault();
        this.setState({
            selectedCode: this.state.customThemeCode
        })
    }
    toggleTeamAvatarStatus() {
        
        this.setState({
            teamAvatar: !this.state.teamAvatar
        })   
    }
    toggleChannelLogoStatus() {
        
        this.setState({
            channelLogo: !this.state.channelLogo
        })   
    }
    openFileInput() {
        this.refs.channelLogo.click();
    }
    inputChange( type ) {
        var self = this;
        if(type == 'file') {
          var oFReader = new FileReader();
          oFReader.readAsDataURL(this.refs.channelLogo.files[0]);
          oFReader.onload = function (oFREvent) {
                self.refs.channelLogoPreview.src = oFREvent.target.result;
          };
        }
    }
    render() {
        
        let getColorsTiles = () => { 
        let colors = [
            {
                code: '#fdb22b'
            },
            {
                code: '#45b166'
            },
            {
                code: '#ef715e'
            },
            {
                code: '#9b59b6'
            },
            {
                code: '#1d97fa'
            },
            {
                code: '#07cee3'
            },
            {
                code: '#e96dae'
            },
            {
                code: '#80c84a'
            },
            {
                code: '#e74c3c'
            },
            {
                code: '#3f51b5'
            },
            {
                code: '#fb8c00'
            }
        ];

        return (
            <div className="color-tile-wrapper">
                {
                    colors.map( (color, index)=> {
                        return (<a 
                                href="#" 
                                key={index} 
                                style={ {backgroundColor: color.code} } 
                                className={'color-tile ' + (this.state.selectedCode === color.code ? ' selected' : '') }
                                onClick={this.selectTheme.bind(this, color)}
                                >
                                </a> )
                        } 
                    )
                }
                <div className="custom-color-picker-wrapper">
                    <div className="custom-color-picker">
                        <a 
                        href="#"
                        style={ {backgroundColor: this.state.customThemeCode} } 
                        className={'color-tile ' + (this.state.selectedCode === this.state.customThemeCode ? ' selected' : '') }
                        onClick={this.selectCustomTheme.bind(this)}
                        >
                        </a>
                        <span className="angle-down-arrow">
                        </span>
                    </div>
                    <span>Custom</span>
                </div>
            </div>
        )
    }
    let fileTemplate;
    if( this.state.channelLogo ) {
        fileTemplate = (
            <div className="channel-logo-input-wrapper">
                <input id="channelLogo" type="file"  accept="image/*" ref="channelLogo" placeholder="avatar" onChange={this.inputChange.bind(this, 'file')} aria-describedby="chatavatar-addon" />
                <div className="channel-logo-preview">
                    <img ref="channelLogoPreview" src="/dist/images/msg-env.png" />
                </div>
                <div className="cell">
                    <button type="button" onClick={this.openFileInput.bind(this)}>CHANGE</button>
                </div>
            </div>
        )
    }
    return (
        <div className="widget-appearance">
            <a href="#" className="widget-close">
            </a>
            <div className="email-camp-channel">
                <span className="email-icon-wrapper">
                    <span className="msg-env"></span>
                </span>
                Email Campaign channel
            </div>
            <h1 className="widget-title">
                Website widget setup
            </h1>
            <h3 className="widget-sub-title">
                Appearance of the widget
            </h3>
            <p className="widget-description">
                Tip: You can change widget's appearance at any time without reinstalling it
            </p>
            
            <div className="key-colors-section">
                <h4 className="key-color-label">Key color</h4>
                {
                    getColorsTiles()
                }
            </div>
            <div className="inputs-wrapper">
                <div className="switchs-wrapper">
                    <div className="input-field-wrapper">
                        <span className="switch-label">Team  avatars</span>
                        <span className={'widget-switch '+ (this.state.teamAvatar? 'switch-on' : '')}
                        onClick={this.toggleTeamAvatarStatus.bind(this)}
                        >
                            <span className="switch-point"></span>
                        </span>
                    </div>
                    <div className="input-field-wrapper">
                        <span className="switch-label">Channel Logo</span>
                        <span className={'widget-switch ' + (this.state.channelLogo? 'switch-on' : '')}
                        onClick={this.toggleChannelLogoStatus.bind(this)}>
                            <span className="switch-point"></span>
                        </span>
                    </div>
                </div>
                {
                    fileTemplate
                }
            </div>
            <div className="widget-preview-label-wrapper">
                <span className="preview-label">Widget preview</span>
                <a href="#/widget/labels" className="edit-label-link">Edit labels</a>
            </div>
            <div className="preview-wrapper">
                <img src={previewImg} />
            </div>
        </div>
    );
  }
}




