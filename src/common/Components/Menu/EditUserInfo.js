import React from 'react'
import closeIcon from '../images/x.svg'

export default class EditUserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.currentUserName || "",
      email: props.currentUserEmail || ""
    }
    this.prepareSubmission = this.prepareSubmission.bind(this)
  }
  nameChange(e) {
    this.setState({name: e.target.value})
  }
  emailChange(e) {
    this.setState({email: e.target.value})
  }
  prepareSubmission(e) {
    e.preventDefault()
    const updates = {email: this.state.email, nickname: this.state.name, first_name: this.state.name}
    this.props.handleUserUpdate(updates)
    this.setState({name: "", email: ""})
  }
  render() {
    const { chatpage, currentUserName, currentUserEmail } = this.props
    return (
      <div style={{height: "100%"}} className="your-details-entry-form">
        <div style={{height: "100%", display: "flex", "flexDirection": "column", flex: "1",   backgroundColor: "#FFFFFF"}}>
          <div style={{padding: "21 30 0 0", position: "absolute",display: "flex", alignSelf: "flex-end"}}>
          <div onClick={this.props.enterEmailForNotificationsToggle} style={{cursor: "pointer", alignSelf: 'flex-end', width: "48px", height: "48px", backgroundImage: `url(${closeIcon})`}}></div>
          </div>
          <div style={{height: "100%", padding: "0 0 0 80" }}>
            <div className="your-details" style={{fontSize: "40", padding: "64 0 10 5"}}>
            Your details
            </div>
            <form onSubmit={this.prepareSubmission} style={{fontSize: "18px"}}>
              <div className="name-or-nickname" style={{padding: "10 10 10 20", letterSpacing: "0.1px"}}>
                Name or nickname
              </div>
              <div style={{padding: "10 10 10 6"}}>
                <input className="capture-details-input" ref="nameCapture" style={{padding: "0 0 18 12", fontSize: "18px", letterSpacing: "0.1px", width: "100%", border: "none", height: "47px", borderBottom: "2px solid"}} placeholder="Enter your name"
                value={this.state.name} onChange={this.nameChange.bind(this)}/>
              </div>
              <div style={{padding: "20 10 10 20", letterSpacing: "0.1px"}}>
                Email for notifications
              </div>
              <div style={{padding: "10 10 10 6"}}>
                <input className="capture-details-input" ref="emailCapture" style={{padding: "0 0 18 12", fontSize: "18px", letterSpacing: "0.1px", width: "100%", border: "none", borderBottom: "2px solid", height: "47px"}}  placeholder="Enter your email"
                value={this.state.email} onChange={this.emailChange.bind(this)}/>
              </div>
              <div style={{padding: "7 0 0 6"}}>
                <button type="submit" style={{ backgroundColor: chatpage ? chatpage.initialConfig.keyColor : "#f7a444", height: "48px", borderRadius: "5px", color: "#FFFFFF", display: "flex", justifyContent: "center", width: "250px", borderStyle: "none"}}>
                  <div style={{alignSelf: "center", fontSize: "18px"}}>Save Changes</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
