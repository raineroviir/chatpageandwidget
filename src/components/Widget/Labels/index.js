import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {ChatWidget} from '../ChatWidget/index';
//let classnames = require('classnames');
import { connect } from 'react-redux';
import * as WidgetActions from '../../../actions/Widget';;
import { bindActionCreators } from 'redux';
/* component styles */
import { styles } from './styles.scss';

import avatarImg  from '../../images/user-icon-black.svg';

export class Labels extends Component {
    constructor( props ) {
        super( props );
    }

    componentWillMount() {
        this.props.actions.updateWidgetKey({
            key: 'classId',
            value: 'labels'
        })
        this.props.actions.updateWidgetKey({
            key: 'widgetMenuState',
            value: false
        });
    }


    updateInputChange( key, e) {

        /*var stateObject = () => {
            var returnObj = {};
            returnObj[key] = e.target.value;
            return returnObj;
        };*/

        this.props.actions.updateKey({
            key: key,
            value: e.target.value
        })

        //this.setState( stateObject() );   

    }

    toggleSwitchStatus( key ) {
        /*var stateObject = () => {
            var returnObj = {};
            returnObj[key] = !this.state[ key ]
            return returnObj;
        };*/
        this.props.actions.updateKey({
            key: key,
            value: !this.props.widgetConfig[ key ]
        })

        /*this.setState( stateObject() ); */  
    }

    inputFileChange( ) {
        var self = this;
        var oFReader = new FileReader();
        oFReader.readAsDataURL(this.refs.botAvatar.files[0]);
        oFReader.onload = (oFREvent) => {
            this.props.actions.updateKey( {
                key: 'botAvatarUrl',
                value: oFREvent.target.result
            } );
            //self.refs.botAvatarPreview.src = oFREvent.target.result;
        };
    }

    openFileInput() {
        this.refs.botAvatar.click();
    }

    render(){
        let user = 'free',  pageDesc;

        if( user === 'free' ) {
            pageDesc = (<div className="page-desc premium-user">
                        
                        <h3 className="widget-sub-title">
                            Available on Plus and Premium plans.
                        </h3> 
                        <div className="buttons-wrapper">
                            <Link className="cc-btn" to="/upgrade/plans">View plans and upgrade </Link>
                        </div>
                        
                    </div>);
        } else {
            pageDesc = (<div className="page-desc free-user">
                        <h3 className="widget-sub-title">
                            Labels & Localization
                        </h3> 

                        <p className="widget-description">
                            If you want to localize chat widget, simply edit app labels below
                        </p>
                    </div>);
        }
        return (
            <div>
                <div className="widget-label-main-content">
                    {
                        pageDesc
                    }
                    
                    <div className="wc-primary-section">
                        <div className="primary-section" className={ (user === 'free') ? 'mask-primary-section' : ''}></div>
                        <div className="labels-form">
                            <div className="input-wrapper">
                                <label className="input-label">
                                    Welcome message
                                </label>
                                <div className="input-field-wrapper">
                                    <textarea className="input-field" value={this.props.widgetConfig.welcomeMessage}
                                    onChange={this.updateInputChange.bind(this,'welcomeMessage')}></textarea>
                                </div>
                            </div>
                            <div className="input-wrapper auto-answer-wrapper">
                                <label className="input-label">
                                    Initial auto-answer
                                </label>
                                <div className="input-field-wrapper">
                                    <textarea className="input-field" 
                                    value={this.props.widgetConfig.autoAnswer}
                                    onChange={this.updateInputChange.bind(this,'autoAnswer')}
                                    ></textarea>
                                </div>
                                <p className="input-desc">Initial answer is a great way to set expectations.</p>
                            </div>
                            <div className="input-wrapper">
                                <label className="input-label">
                                    Email prompt
                                </label>
                                <div className="input-field-wrapper">
                                    <input className="input-field"
                                    value={this.props.widgetConfig.emailPrompt}
                                    onChange={this.updateInputChange.bind(this,'emailPrompt')}
                                    />
                                </div>
                            </div>
                            
                            <div className="row ">
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                            Email placeholder
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field" 
                                            value={this.props.widgetConfig.emailPlaceholder}
                                            onChange={this.updateInputChange.bind(this,'emailPlaceholder')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                            Input string placeholder
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field"  
                                            value={this.props.widgetConfig.inputMsgholder}
                                            onChange={this.updateInputChange.bind(this,'inputMsgholder')}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                            Send button text
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field"  
                                            value={this.props.widgetConfig.sendBtnText}
                                            onChange={this.updateInputChange.bind(this,'sendBtnText')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-wrapper cc-branding-wrapper">
                                        <span className={'widget-switch '+ (this.props.widgetConfig.ccBranding? 'switch-on' : '')}
                                        onClick={this.toggleSwitchStatus.bind(this, 'ccBranding')}
                                        >
                                            <span className="switch-point"></span>
                                        </span>
                                        <label className="input-label">
                                            Chat Center Branding
                                        </label>
                                        <p className="input-desc">
                                            Premium plan is needed  to remove
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <label className="input-label">
                                            Bot name
                                        </label>
                                        <div className="input-field-wrapper">
                                            <input type="text" 
                                            className="input-field"  
                                            value={this.props.widgetConfig.botName}
                                            onChange={this.updateInputChange.bind(this,'botName')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="input-wrapper">
                                        <div className="bot-avatar-wrapper">
                                            <input id="botAvatar" type="file"  accept="image/*" 
                                            ref="botAvatar"
                                            onChange={this.inputFileChange.bind(this)} 
                                            />
                                            <div className="bot-avatar-preview">
                                                <img ref="botAvatarPreview" 
                                                src={this.props.widgetConfig.botAvatarUrl}
                                                />
                                            </div>
                                            <div className="cell">
                                                <label className="input-label">
                                                    Bot avatar
                                                </label>
                                                <button type="button" 
                                                onClick={this.openFileInput.bind(this)}
                                                >CHANGE</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div className="widget-label-chat-preview">
                   <ChatWidget widgetConfig={this.props.widgetConfig}/>
                </div>
        
            </div>
        );
    }
}

Labels.propTypes = {
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
    actions: bindActionCreators(WidgetActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Labels)