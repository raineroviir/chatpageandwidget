import React from 'react'
import closeIcon from '../images/x.svg'

export default class EditUserInfo extends React.Component {
  render() {
    const { chatpage, currentUserName, currentUserEmail } = this.props
    return (
      <div className="your-details-entry-form">
        <div style={{padding: "10px", display: "flex", "flexDirection": "column", flex: "1",   backgroundColor: "#FFFFFF"}}>
        <div onClick={this.props.enterEmailForNotificationsToggle} style={{cursor: "pointer", alignSelf: 'flex-end', width: "48px", height: "48px", backgroundImage: `url(${closeIcon})`}}></div>
        <div className="your-details" style={{padding: "10 0 10 0"}}>
          Your Details
        </div>
          <form onSubmit={this.props.handleUserUpdate} style={{fontSize: "15px"}}>
            <div style={{padding: "10px", letterSpacing: "0.1px"}}>
              Name or nickname
            </div>
            <div style={{padding: "10px"}}>
              <input className="capture-details-input" ref="nameCapture" style={{fontSize: "15px", letterSpacing: "0.1px", width: "100%", border: "none", height: "30px", borderBottom: "2px solid"}} placeholder={currentUserName ? currentUserName : "Enter your name"}/>
            </div>
            <div style={{padding: "10px", letterSpacing: "0.1px"}}>
              Email for notifications
            </div>
            <div style={{padding: "10px"}}>
              <input className="capture-details-input" ref="emailCapture" style={{fontSize: "15px", letterSpacing: "0.1px", width: "100%", border: "none", borderBottom: "2px solid", height: "30px"}}  placeholder={currentUserEmail ? currentUserEmail : "Enter your email"}/>
            </div>
            <div style={{padding: "20px 0 0 0"}}>
              <button type="submit" style={{ backgroundColor: chatpage ? chatpage.initialConfig.keyColor : "#f7a444", height: "48px", borderRadius: "5px", color: "#FFFFFF", display: "flex", justifyContent: "center", width: "100%", borderStyle: "none"}}>
                <div style={{alignSelf: "center", fontSize: "15px"}}>Save Changes</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
