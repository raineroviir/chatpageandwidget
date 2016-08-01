import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import * as WidgetActions from '../../../actions/Widget';
import * as PoptartActions from '../../../actions/Poptart';
import { bindActionCreators } from 'redux';

/* component styles */
import { styles } from './styles.scss';

import previewImg from '../../images/preview.png';


export class Appearance extends Component {
    constructor(props){
        super( props );
        let colors = [
            '#fdb22b',
            '#45b166',
            '#ef715e',
            '#9b59b6',
            '#1d97fa',
            '#07cee3',
            '#e96dae',
            '#80c84a',
            '#e74c3c',
            '#3f51b5',
            '#fb8c00'
        ]
        this.state = {
            customThemeCode: '#fdb22c',
            colors: colors
        };

        this.state.isCustomCode = colors.indexOf(this.props.widgetConfig.keyColor) === -1 ? true : false;

        if( this.state.isCustomCode ) {
            this.state.customThemeCode = this.props.widgetConfig.keyColor;
        } 

    }

    componentWillMount() {
        this.props.actions.updateWidgetKey({
            key: 'classId',
            value: 'appearance'
        });
        this.props.actions.updateWidgetKey({
            key: 'widgetMenuState',
            value: false
        });
    }

    selectKeyColor( color, e ) {
        e.preventDefault();
        this.setState({
            isCustomCode: false
        });
        this.props.actions.updateKey( {
            key:'keyColor',
            value: color
        } );
    }
    selectCustomTheme( e ) {
        e.preventDefault();
        this.setState({
            isCustomCode: true
        });
        this.props.actions.updateKey( {
            key:'keyColor',
            value: this.state.customThemeCode
        } );
    }
    toggleTeamAvatarStatus() {
        this.props.actions.updateKey( {
            key:'teamAvatar',
            value: !this.props.widgetConfig.teamAvatar
        } );
    }
    toggleChannelLogoStatus() {
        this.props.actions.updateWigetConfigState( {
            channel: {
                ...this.props.widgetConfig.channel,
                avatar: !this.props.widgetConfig.channel.avatar
            }
        } );
    }
    openFileInput() {
        this.refs.channelLogo.click();
    }
    inputChange( type ) {
        var self = this;
        if(type == 'file') {
          var oFReader = new FileReader();
          oFReader.readAsDataURL(this.refs.channelLogo.files[0]);
          oFReader.addEventListener("load",  (oFREvent) => {
            this.props.actions.updateWigetConfigState( {
                channel: {
                    ...this.props.widgetConfig.channel,
                    avatarUrl: oFREvent.target.result
                }
            } );
          }, false);
        }
    }
    openCustomColorPicker( e ) {

        this.props.poptartActions.setPoptartComponent(
            <div className="color-picker-model"
            style = {
                {
                    left: $(e.currentTarget).offset().left + 4,
                    top: $(e.target).offset().top + 50
                }
            }
            >
                <SketchPicker 
                    color={ this.state.customThemeCode }
                    onChangeComplete={ this.handleChangeComplete.bind( this ) }
                    />
            </div>
        )
    }
    handleChangeComplete( color ) {
        this.setState({
            isCustomCode : true,
            customThemeCode: color.hex
        });
        this.props.actions.updateKey( {
            key: 'keyColor',
            value: color.hex
        } );

    }
    render() {
        
        let getColorsTiles = () => {
        console.log('this.state.customThemeCode',this.state.customThemeCode); 
            return (
                <div className="color-tile-wrapper">
                    {
                        this.state.colors.map( (color, index)=> {
                            return (<a 
                                    href="#" 
                                    key={index} 
                                    style={ {backgroundColor: color} } 
                                    className={'color-tile ' + (this.props.widgetConfig.keyColor === color ? ' selected' : '') }
                                    onClick={this.selectKeyColor.bind(this, color)}
                                    >
                                    </a> )
                            } 
                        )
                    }
                    <div className="custom-color-picker-wrapper">
                        <div className="custom-color-picker" onClick={this.openCustomColorPicker.bind(this)}>
                            <a 
                            href="#"
                            style={ {backgroundColor: this.state.customThemeCode} } 
                            className={'color-tile ' + ( this.state.isCustomCode ? ' selected' : '') }
                            onClick={this.selectCustomTheme.bind(this)}
                            >
                            </a>
                            <span className="angle-down-arrow" 
                            >
                            </span>
                            
                        </div>
                        <span>Custom</span>
                    </div>
                </div>
            )
        }

    let fileTemplate;
    if( this.props.widgetConfig.channel.avatar ) {

        fileTemplate = (
            <div className="channel-logo-input-wrapper">
                <input id="channelLogo" type="file"  
                accept="image/*" ref="channelLogo" 
                placeholder="avatar" 
                onChange={this.inputChange.bind(this, 'file')} 
                aria-describedby="chatavatar-addon" 
                />
                <div className="channel-logo-preview">
                    <img 
                    ref="channelLogoPreview" 
                    src={ this.props.widgetConfig.channel.avatarUrl} 
                    />
                </div>
                <div className="cell">
                    <button type="button" onClick={this.openFileInput.bind(this)}>CHANGE</button>
                </div>
            </div>
        )
    }
    return (
        <div>
            <h3 className="widget-sub-title">
                Appearance of the widget
            </h3>
            <p className="widget-description">
                Tip: You can change widget&#39;s appearance at any time without reinstalling it
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
                        <span className={'widget-switch '+ (this.props.widgetConfig.teamAvatar? 'switch-on' : '')}
                        onClick={this.toggleTeamAvatarStatus.bind(this)}
                        >
                            <span className="switch-point"></span>
                        </span>
                    </div>
                    <div className="input-field-wrapper">
                        <span className="switch-label">Channel Logo</span>
                        <span className={'widget-switch ' + (this.props.widgetConfig.channel.avatar? 'switch-on' : '')}
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
                <Link to="/widget/labels" className="edit-label-link">Edit labels</Link>
            </div>
            <div className="preview-wrapper">
                <img src={previewImg} />
            </div>
        </div>
    );
  }
}

Appearance.propTypes = {
  // todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    conversations: state.conversations,
    widgetConfig: state.widgetConfig,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WidgetActions, dispatch),
    poptartActions : bindActionCreators(PoptartActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Appearance)


