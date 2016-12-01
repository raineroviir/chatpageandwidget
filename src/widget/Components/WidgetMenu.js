import React from 'react'
import closeIcon from '../../common/Components/images/x.svg'
import MenuItems from '../../common/Components/Menu/MenuItems'

export default class WidgetMenu extends React.Component {
  render() {
    const { widget, guest, user } = this.props
    return (
      <div style={{color: widget.initialConfig.keyColor}} className="widget-menu">
        <div style={{padding: "10 10 0 0", display: "flex", justifyContent: "flex-end"}}>
          <div onClick={this.props.menuToggle.bind(this)} style={{cursor: "pointer", alignSelf: 'flex-end', width: "48px", height: "48px", backgroundImage: `url(${closeIcon})`}}></div>
        </div>
        <MenuItems {...this.props}/>
      </div>
    )
  }
}
