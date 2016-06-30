import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class HeaderView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openFeature: false,
      showSettingsMenu: false,
      settingsMenuLeft: '0px'
    };
  }


  toggleFeturePanel( e ) {
    e.preventDefault();
    this.setState({
      openFeature: !this.state.openFeature
    });
  }

  toggleSettingsMenu( e ){
    e.preventDefault();
    this.setState({
      showSettingsMenu: !this.state.showSettingsMenu
    });
    let ele = e.currentTarget;
    this.setState({
       settingsMenuLeft : ( ele.offsetLeft - 46 )  + 'px'
    })
  }

  render() {
    //console.log( 'this.state', this.state );
    let user = this.props.user.userinfo,
      channel = this.props.channelInfo;

    /*
    
    <span className="glyphicon glyphicon-circle-arrow-left arrow-left-icon" aria-hidden="true"></span> 

    <span className="glyphicon glyphicon-user visible-xs" aria-hidden="true">
              </span>
    */
    
    return (

      <div className="header">
          <div className="goback-icon">
            <span className="glyphicon glyphicon-chevron-left"></span>
          </div>
          <div className= { this.state.openFeature ? "feature-panel open-feature" : "feature-panel"} >
            <a href="#" className="glyphicon glyphicon-menu-hamburger  feature-panel-menu" onClick={this.toggleFeturePanel.bind(this)}> </a>
            <ul className="feature-list">
              <li className="button-search"></li>
              <li className="button-new"></li>
              <li className="button-mention"></li>
              <li className="button-tag"></li>
            </ul>
          </div>
          <div className="title-section">

            <h1 className="title">
              { channel && channel.name}
              <a href="#" onClick={this.toggleSettingsMenu.bind(this)}>
                <span className="channel-setting" aria-hidden="true"></span>
              </a>
            </h1>
            <div className={"settings-menu" + (this.state.showSettingsMenu ? ' show-menu': '')} 
            style={
              {
                left:this.state.settingsMenuLeft
              }
            }
            >
              <ul>
                <li>
                  <Link to="/widget/installation">Website widget setup</Link>
                </li>
                <li>
                  <a>Click to Chat button setup</a>
                </li>
                <li>
                  <a>Chat page setup</a>
                </li>
                <li className="separator">
                  <Link to={channel ? '/channel/edit/' + channel.id : 'javascript:;'}>Channel name and URL</Link>
                </li>
                <li>
                  <a>Channel notification preferances</a>
                </li>
                <li>
                  <Link to={channel ? '/channel/members/' + channel.id : 'javascript:;'}>Channel members</Link>
                </li>
                <li>
                  <a>Channel responces</a>
                </li>
              </ul>
            </div>
            <p className="channel-name-wrapper">
              <span className="channel-name">
              {
                channel ? (channel.address.domain + "/" + channel.address.channel) : ""
              }
              </span>
              <span className="label label-default">SHARE</span>
              </p>
          </div>

         
      </div>
    );
  }
}