import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

/* components */
import { HomeView } from 'components/Home';
import Guest from 'containers/Home/Guest';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ChannelsActions from '../../actions/Channels';


export class Home extends Component {
  componentDidMount() {
    $('.mCustomScrollBar').mCustomScrollbar({ 
      theme:"dark-3"        
  });
    
  $('.chat-contacts').height($(window).height()-$('header').height()-35);
  
    $('.chat-group').height($(window).height()-$('footer').height()-$('header').height()-75);

  
  $('.channel-list').on('click', function (e) {
    if($(e.target).closest('.leftmenu').length == -1 || !$(e.target).hasClass('glyphicon-menu-hamburger')) {
      $('.leftmenu').addClass('hidden-xs');
    }
  });
  $('.main header').on('click', '.groups-link', function () {
    $('.chat-contacts').toggleClass('hidden-xs');
  });
  $('.main').on('click', function (e) {
    if($(e.target).closest('.chat-contacts').length == -1 || !$(e.target).hasClass('glyphicon-user'))
      $('.chat-contacts').addClass('hidden-xs');
  });
  $('.channel-list').on('click', '.user-item li:not(".header")', function() {
    $('.sidebar').toggleClass('hidden-xs hidden-sm');
    $('.main').toggleClass('hidden-xs hidden-sm');
    $('.mCustomScrollBar').mCustomScrollbar({ 
        theme:"dark-3"        
    });
  });

    $('.user-info').on('click', '.menu-hamburger', function () {
        $( 'body' ).toggleClass( 'show-master-nav' );
    });

    //show chat-panel on click of the chat message
    $( '.chat-lists-wrapper' ).on('click', '.chat-message', function  (e) {
      if($(this).hasClass('no-user')) {
        $( 'body' ).addClass( 'show-chat-panel' );
        $('.goback-icon').addClass('skip-user');
      } else {
        $( 'body' ).addClass( 'show-conversation-panel' );
      }
    });

    $( 'body' ).on('click', '.chats-contacts li a', function  (argument) {
        $( 'body' ).removeClass( 'show-conversation-panel' ).addClass( 'show-chat-panel' );
    });
 
    $('body').on('click', '.goback-icon', function() {
      if($(this).hasClass('skip-user')) {
        $( 'body' ).removeClass( 'show-chat-panel show-conversation-panel' );
        $('.goback-icon').removeClass('skip-user')
      } else if($( 'body' ).hasClass( 'show-chat-panel' )) {
        $( 'body' ).removeClass( 'show-chat-panel' ).addClass( 'show-conversation-panel' );
      } else if($( 'body' ).hasClass( 'show-conversation-panel' )) {
        $( 'body' ).removeClass( 'show-chat-panel show-conversation-panel' );
      }
    } );

  $('.main header').on('click', '.glyphicon-circle-arrow-left', function() {
    $('.sidebar').toggleClass('hidden-xs hidden-sm');
    $('.main').toggleClass('hidden-xs hidden-sm');
  });
  // Bug fix for mCustomScrollbar as its updateOnBrowserResize isnt working as expected
  $(window).resize(function() {
    $('.mCustomScrollBar').removeAttr("style").mCustomScrollbar({ 
      theme:"dark-3"        
    });
  });
  }
  render() {
    if(this.props.isGuest){
      return (
        <Guest />
      );
    }
    else {
      return (
        <HomeView urlparams={this.props.params} historyApi={this.props.history} isGroupChat={this.props.isGroupChat} />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isGroupChat: state.channels.channels.isGroupChat,
    isGuest: state.guest.guest
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChannelsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)