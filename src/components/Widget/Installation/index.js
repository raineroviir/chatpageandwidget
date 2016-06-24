import React, { Component } from 'react';
import { Link } from 'react-router';
//let classnames = require('classnames');

/* component styles */
import { styles } from './styles.scss';


export class Installation extends Component {
  
    getScriptText(){

        return "<div id='chat-center-widget' data-chat-id='"+this.props.channelid+"'></div>\n<script>(function(d,s){var js,cjs=d.getElementsByTagName(s)[0];js=d.createElement(s);js.src='//chat.center/javascript/widget.js';cjs.parentNode.insertBefore(js,cjs);}(document,'script'))"
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
            <div className="widget-installation">
                <a href="#/dashboard" className="widget-close">
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
                    Installing Widget Code on Your Website
                </h3>
                <p className="widget-description">
                    In order to receive messages from clients on your website, please
insert this code on every page of your website after &lt;body&gt; tag.
                </p>

                <div className="wc-primary-section">
                    <div className="wc-primary-section-content">
                        <pre className="installation-script-section">
                            {
                                this.getScriptText()
                            }
                        </pre>    
                    
                        <div className="buttons-wrapper">
                            <button className="cc-btn cc-primary-btn" type="button">COPY</button>
                            <a className="link-email-instructions widget-link" href="#">Email instructions to webmaster</a>
                        </div>
                        <div className="tip-wrapper">
                            Tip: You can change widget's <a className="widget-link" href="#/widget/appearance">appearance</a> at any time without reinstalling it
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




