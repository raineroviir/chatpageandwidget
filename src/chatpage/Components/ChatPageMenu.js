import React from 'react'
import MenuItems from '../../common/Components/Menu/MenuItems'

export default class ChatPageMenu extends React.Component {

  render() {
    const { chatpage, guest, user } = this.props
    return (
      <div style={{color: chatpage ? chatpage.initialConfig.keyColor : "#f7a444"}} className="chatpage-menu">
        <MenuItems {...this.props} />
      </div>
    )
  }
}
