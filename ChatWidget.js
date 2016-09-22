import React from 'react'
import CreateMessage from './CreateMessage'
import Messages from './Messages'

export default class ChatWidget extends React.Component {
  render() {
   return (
     <div
       style={{
         ...this.props.style,
         position: 'absolute',
         backgroundColor: '#EEE',
         boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
         border: '1px solid #CCC',
         borderRadius: 3,
         marginLeft: -5,
         marginTop: 5,
         marginBottom: 5,
         padding: 8,
         height: '30em'
       }}
     >
       <Messages />
       <CreateMessage />
     </div>
   );
 }
}
