import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { SketchPicker } from 'react-color';
import { connect } from 'react-redux';
import * as ChatPageActions from '../../../actions/ChatPage';
import * as PoptartActions from '../../../actions/Poptart';
import { bindActionCreators } from 'redux';
import { CustomColorPicker } from './custom-color-picker';
import * as tabNavActions from '../../../actions/TabNav';

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
            customBgThemeCode:'#fdb22c',
            colors: colors
        };

        this.state.isCustomCode = colors.indexOf(this.props.chatPageConfig.keyColor) === -1 ? true : false;
         this.state.isBgCustomCode = colors.indexOf(this.props.chatPageConfig.bgColor) === -1 ? true : false;

        if( this.state.isCustomCode ) {
            this.state.customThemeCode = this.props.chatPageConfig.keyColor;
        } 
        if( this.state.isBgCustomCode ) {
            this.state.customBgThemeCode = this.props.chatPageConfig.bgColor;
        }

    }

    componentWillMount() {
        this.props.actions.updateChatPageKey({
            key: 'classId',
            value: 'appearance'
        });
        this.props.tabNavActions.setTabNavState( false );
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
    selectBgColor( color, e ) {
        e.preventDefault();
        this.setState({
            isBgCustomCode: false
        });
        this.props.actions.updateKey( {
            key:'bgColor',
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
    selectBgCustomTheme( e ) {
        e.preventDefault();
        this.setState({
            isBgCustomCode: true
        });
        this.props.actions.updateKey( {
            key:'bgColor',
            value: this.state.customBgThemeCode
        } );
    }
    toggleTeamAvatarStatus() {
        this.props.actions.updateKey( {
            key:'teamAvatar',
            value: !this.props.chatPageConfig.teamAvatar
        } );
    }
    toggleChannelLogoStatus() {
        this.props.actions.updateChatPageConfigState( {
            channel: {
                ...this.props.chatPageConfig.channel,
                avatar: !this.props.chatPageConfig.channel.avatar
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
            this.props.actions.updateChatPageConfigState( {
                channel: {
                    ...this.props.chatPageConfig.channel,
                    avatarUrl: oFREvent.target.result
                }
            } );
          }, false);
        }
    }
    openCustomColorPicker( e ) {
        let left = $(e.currentTarget).offset().left + 4;
        let top = $(e.target).offset().top + 50;
        this.props.poptartActions.setPoptartComponent(
            <CustomColorPicker 
            left = {left} 
            top = {top}
            color={ this.state.customThemeCode }
            onSelect={ this.handleChangeComplete.bind( this ) }
            closeColorPicker = { this.props.poptartActions.hidePoptart} 
            />
        )
    }
    openCustomBgColorPicker( e ) {
        let left = $(e.currentTarget).offset().left + 4;
        let top = $(e.target).offset().top + 50;
        this.props.poptartActions.setPoptartComponent(
            <CustomColorPicker 
            left = {left} 
            top = {top}
            color={ this.state.customBgThemeCode }
            onSelect={ this.handleChangeBgComplete.bind( this ) }
            closeColorPicker = { this.props.poptartActions.hidePoptart} 
            />
        )
    }
    handleChangeComplete( color ) {
        this.setState({
            isCustomCode : true,
            customThemeCode: color
        });
        this.props.actions.updateKey( {
            key: 'keyColor',
            value: color
        } );
        this.props.actions.updateKey( {
            key:'keyColor',
            value: this.state.customThemeCode
        } );

    }
     handleChangeBgComplete( color ) {
        this.setState({
            isBgCustomCode : true,
            customBgThemeCode: color
        });
        this.props.actions.updateKey( {
            key: 'bgColor',
            value: color
        } );
        this.props.actions.updateKey( {
            key:'bgColor',
            value: this.state.customBgThemeCode
        } );

    }
    render() {
        
        let getColorsTiles = () => {
        //console.log('this.state.customThemeCode',this.state.customThemeCode); 
            return (
                <div className="color-tile-wrapper">
                    {
                        this.state.colors.map( (color, index)=> {
                            return (<a 
                                    href="#" 
                                    key={index} 
                                    id="keycolor"
                                    style={ {backgroundColor: color} } 
                                    className={'color-tile ' + (this.props.chatPageConfig.keyColor === color ? ' selected' : '') }
                                    onClick={this.selectKeyColor.bind(this, color)}
                                    >
                                    </a> )
                            } 
                        )
                    }
                    <div className="custom-color-picker-wrapper">
                        <div className="custom-color-picker" onClick={this.openCustomColorPicker.bind(this)}>
                            <a 
                            style={ {backgroundColor: this.state.customThemeCode} } 
                            className={'color-tile ' + ( this.state.isCustomCode ? ' selected' : '') }
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
// for bgcolor
let getBGColorsTiles = () => {
        //console.log('this.state.customThemeCode',this.state.customThemeCode); 
            return (
                <div className="color-tile-wrapper">
                    {
                        this.state.colors.map( (color, index)=> {
                            return (<a 
                                    href="#" 
                                    key={index}
                                    id="bgcolor" 
                                    style={ {backgroundColor: color} } 
                                    className={'color-tile ' + (this.props.chatPageConfig.bgColor === color ? ' selected' : '') }
                                    onClick={this.selectBgColor.bind(this, color)}
                                    >
                                    </a> )
                            } 
                        )
                    }
                    <div className="custom-color-picker-wrapper">
                        <div className="custom-color-picker" onClick={this.openCustomBgColorPicker.bind(this)}>
                            <a 
                            style={ {backgroundColor: this.state.customBgThemeCode} } 
                            className={'color-tile ' + ( this.state.isBgCustomCode ? ' selected' : '') }
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
//bgcolor end
    let fileTemplate;
    if( this.props.chatPageConfig.channel.avatar ) {

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
                    src={ this.props.chatPageConfig.channel.avatarUrl} 
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
                Appearance of the chat page
            </h3>
            
            
            <div className="key-colors-section">
                <h4 className="key-color-label">Key color</h4>
                {
                    getColorsTiles()
                }
            </div>
            <div className="key-colors-section">
                <h4 className="key-color-label">Background color</h4>
                {
                    getBGColorsTiles()
                }
            </div>
            <div className="inputs-wrapper">
                <div className="switchs-wrapper">
                    <div className="input-field-wrapper">
                        <span className="switch-label">Team  avatars</span>
                        <span className={'widget-switch '+ (this.props.chatPageConfig.teamAvatar? 'switch-on' : '')}
                        onClick={this.toggleTeamAvatarStatus.bind(this)}
                        >
                            <span className="switch-point"></span>
                        </span>
                    </div>
                    <div className="input-field-wrapper">
                        <span className="switch-label">Channel Logo</span>
                        <span className={'widget-switch ' + (this.props.chatPageConfig.channel.avatar? 'switch-on' : '')}
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
                <span className="preview-label">Chat page preview</span>
                <Link to="/ChatPage/labels" className="edit-label-link">Edit appearance</Link>
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
    chatPageConfig: state.chatPageConfig,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChatPageActions, dispatch),
    poptartActions : bindActionCreators(PoptartActions, dispatch),
    tabNavActions:  bindActionCreators( tabNavActions, dispatch )
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Appearance)


