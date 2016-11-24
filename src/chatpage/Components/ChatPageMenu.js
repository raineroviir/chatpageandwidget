import React from 'react'
import closeIcon from '../../common/Components/images/x.svg'

export default class ChatPageMenu extends React.Component {
  render() {
    const { chatpage, guest, user } = this.props
    return (
      <div style={{color: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}} className="chatpage-menu">
        <div style={{padding: "10 10 0 0", display: "flex", justifyContent: "flex-end"}}>
          <div onClick={this.props.menuToggle.bind(this)} style={{cursor: "pointer", alignSelf: 'flex-end', width: "48px", height: "48px", backgroundImage: `url(${closeIcon})`}}></div>
        </div>
          <div style={{color: "black", padding: "10px"}}>
            <div style={{display: "flex", fontSize: "30px"}}>
              {guest.data.first_name || user.data.first_name ?
                <div>
                  {guest.data.first_name || user.data.first_name}
                </div> : null
              }
              {guest.data.last_name || user.data.last_name ?
                <div style={{paddingLeft: "5px"}}>
                  {guest.data.last_name || user.data.last_name}
                </div> : null
              }
            </div>
          {guest.data.email || user.data.email ?
            <div>
              <div>
                {guest.data.email || user.data.email}
              </div>
              <div>
                {guest.guest && <div style={{opacity: "0.6"}}>temporary account</div>}
              </div>
            </div> :
            <div style={{border: "none"}} className="menu-item">
              <div onClick={this.props.enterEmailForNotificationsToggle} style={{cursor: "pointer"}}>
                Enter email for notifications
              </div>
            </div>
          }
          </div>
        {guest.data.email && <div>
          <div className="menu-item">
            <div onClick={this.props.enterEmailForNotificationsToggle} style={{cursor: "pointer"}}>Edit</div>
          </div>
          <div className="menu-item">
            <div onClick={this.props.forgetMe} style={{cursor: "pointer"}}>Forget me</div>
          </div>
        </div>}
        <div className="menu-item">
          <div style={{cursor: "pointer"}}>Sign in with chat.center</div>
        </div>
        <div  className="menu-item">
          <div>
            <div style={{color: "#000000"}}>Don't have an account?</div>
          </div>
          <div>
          <div onClick={this.props.showRegistrationToggle} style={{cursor: "pointer"}}>Sign up</div>
          </div>
        </div>
      </div>
    )
  }
}
