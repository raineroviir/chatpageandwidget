import React from 'react'

export default class MenuItems extends React.Component {
  constructUserDetails() {
    const { user, guest } = this.props
    if (user.token || guest.token) {
      return (
        <div style={{color: "black", padding: "10px"}}>
          <div className="user-name" style={{display: "flex"}}>
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
          {guest.data.email &&
            <div>
              <div>
                {guest.data.email === "placeholder" ? null : guest.data.email}
              </div>
              <div>
                {guest.guest && <div className="temporary-account" style={{fontSize: "13px"}}>temporary account</div>}
              </div>
            </div>
          }
          {user.data.team && user.data.team.name ? <div className="user-chat-channel">{user.data.team.name}</div> : null}
        </div>
      )
    }
  }
  constructNoUserItems() {
    const { user, guest } = this.props
    if (!guest.data.id && !user.data.id) {
      return (
        <div style={{border: "none"}} className="menu-item">
          <div onClick={this.props.enterEmailForNotificationsToggle} style={{cursor: "pointer", fontSize: "15px"}}>
          Enter email for notifications
          </div>
        </div>
      )
    }
  }
  constructGuestMenuItems() {
    const { user, guest } = this.props
    return (
      guest.data.email && <div>
        <div className="menu-item">
          <div onClick={this.props.enterEmailForNotificationsToggle} style={{cursor: "pointer"}}>Edit</div>
        </div>
        <div className="menu-item">
          <div onClick={this.props.forgetMe} style={{cursor: "pointer"}}>Forget me</div>
        </div>
      </div>
    )
  }
  constructUserMenuItems() {
    const { user, guest } = this.props
    return (
      user.data.id ? <div onClick={this.props.signOut} className="menu-item">
      <div style={{cursor: "pointer"}}>Sign out</div>
      </div>
      :
      <div>
        <div className="menu-item">
          <div onClick={this.props.showLoginToggle} style={{cursor: "pointer"}}>Sign in with chat.center</div>
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
  render() {
    return (
      <div>
        <div>{this.constructUserDetails()}</div>
        <div>{this.constructNoUserItems()}</div>
        <div>{this.constructGuestMenuItems()}</div>
        <div>{this.constructUserMenuItems()}</div>
      </div>
    )
  }
}
