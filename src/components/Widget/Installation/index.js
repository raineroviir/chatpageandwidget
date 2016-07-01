import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
//let classnames = require('classnames');
import { connect } from 'react-redux';
import * as WidgetActions from '../../../actions/Widget';;
import { bindActionCreators } from 'redux';
import { TextSelection } from '../../../modules/TextSelection';
import { browserHistory } from 'react-router';


/* component styles */
import { styles } from './styles.scss';


export class Installation extends Component {
  
    getScriptText(){

        return "<div id='chat-center-widget' data-chat-id='"+this.props.conversations.channelid+"'></div>\n<script>(function(d,s){var js,cjs=d.getElementsByTagName(s)[0];js=d.createElement(s);js.src='//chat.center/javascript/widget.js';cjs.parentNode.insertBefore(js,cjs);}(document,'script'))"
    }
    componentDidMount() {

        if( !this.props.conversations.channelid ) {
            browserHistory.push("/dashboard");
            return;
        }

        $(document).keyup(this.keyupEvent);
        this.props.actions.initWidgetConfig( this.props.conversations.channelid );
    }
    componentWillUnmount() {
        //unbind the event keyup binded 
        $(document).unbind( 'keyup', this.goToDashboard );
    }
    keyupEvent(e){
        if (e.which==27){
            //window.location.hash = "#/dashboard";
            browserHistory.push("/dashboard");
        }
    }
    componentWillMount() {
        this.props.actions.updateWidgetKey({
            key: 'classId',
            value: 'installation'
        })
        this.props.actions.updateWidgetKey({
            key: 'widgetMenuState',
            value: false
        });
    }
    copyScript() {        
        TextSelection( document.getElementById( 'installation-script') );
        document.execCommand("copy");
        
    }

    render() {
        let getPluginTiles = ()=> {
            let platforms = [
                {
                    logo: 'wordpress-logo',
                    platformName: 'WORDPRESS'
                },
                {
                    logo: 'wordpress-logo',
                    platformName: 'SHOPIFY'
                },
                {
                    logo: 'wordpress-logo',
                    platformName: 'JOOMLA'
                },
                {
                    logo: 'wordpress-logo',
                    platformName: 'MAGENTO'
                },
                {
                    logo: 'wordpress-logo',
                    platformName: 'DRUPAL'
                }

            ]
            return (
                <div className="plugins-section">
                    {platforms.map((item, index)=>{
                        return (<div className="pulgin-for-tile" key={index}>
                                <div className="pulgin-for">
                                <span className={'platform-logo '  + item.logo}>
                                </span>
                                <div className="platform-name-wrapper">
                                    <div className="primary-text">PLUGIN FOR</div>
                                    <div className="platform-name">{item.platformName}</div>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>
            )
        }
        return (
            <div>
                <h3 className="widget-sub-title">
                    Installing Widget Code on Your Website
                </h3>
                <p className="widget-description">
                    In order to receive messages from clients on your website, please
insert this code on every page of your website after &lt;body&gt; tag.
                </p>

                <div className="wc-primary-section">
                    <div className="wc-primary-section-content">
                        <pre className="installation-script-section" id="installation-script">
                            {
                                this.getScriptText()
                            }
                        </pre>    
                    
                        <div className="buttons-wrapper">
                            <button className="cc-btn cc-primary-btn" type="button" onClick={this.copyScript.bind(this)}>COPY</button>
                            <a className="link-email-instructions widget-link" href="#">Email instructions to webmaster</a>
                        </div>
                        <div className="tip-wrapper">
                            Tip: You can change widget&#39;s <Link className="widget-link" to="/widget/appearance">appearance</Link> at any time without reinstalling it
                        </div>
                    </div>
                </div>
                {
                    getPluginTiles()
                }
                
        
            </div>
        );
    }
}




Installation.propTypes = {
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
    actions: bindActionCreators(WidgetActions, dispatch)
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(Installation)