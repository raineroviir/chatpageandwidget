import React from 'react'
import closeIcon from '../../common/Components/images/x.svg'

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
    console.log(this.props)
    e.preventDefault()
    const updates = {email: this.state.email, nickname: this.state.name, first_name: this.state.name}
    this.props.handleUserUpdate(updates)
    this.setState({name: "", email: ""})
  }
  render() {
    const { widget, currentUserName, currentUserEmail } = this.props
    return (
      <div className="your-details-entry-form">
        <div style={{padding: "10px", display: "flex", "flexDirection": "column"}}>
        <div onClick={this.props.enterEmailForNotificationsToggle} style={{cursor: "pointer", alignSelf: 'flex-end', width: "48px", height: "48px", backgroundImage: `url(${closeIcon})`}}></div>
        <div className="your-details" style={{padding: "10 0 10 0"}}>
          Your Details
        </div>
          <form onSubmit={this.prepareSubmission} style={{fontSize: "15px"}}>
            <div style={{padding: "10px", letterSpacing: "0.1px"}}>
              Name or nickname
            </div>
            <div style={{padding: "10px"}}>
              <input className="capture-details-input" ref="nameCapture" style={{fontSize: "15px", letterSpacing: "0.1px", width: "100%", border: "none", height: "30px", borderBottom: "2px solid"}} placeholder={"Enter your name"} value={this.state.name} onChange={this.nameChange.bind(this)}/>
            </div>
            <div style={{padding: "10px", letterSpacing: "0.1px"}}>
              Email for notifications
            </div>
            <div style={{padding: "10px"}}>
              <input className="capture-details-input" ref="emailCapture" style={{fontSize: "15px", letterSpacing: "0.1px", width: "100%", border: "none", borderBottom: "2px solid", height: "30px"}}  placeholder={"Enter your email"} value={this.state.email} onChange={this.emailChange.bind(this)}/>
            </div>
            <div style={{padding: "20px 0 0 0"}}>
              <button type="submit" style={{ backgroundColor: widget.initialConfig.keyColor, height: "48px", borderRadius: "5px", color: "#FFFFFF", display: "flex", justifyContent: "center", width: "100%", borderStyle: "none"}}>
                <div style={{alignSelf: "center", fontSize: "15px"}}>Save Changes</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
